
from fastapi import APIRouter, HTTPException, Depends
from admin.migration.external_api import fetch_posts,fetch_posts_common,fetch_posts_intro
from admin.migration.mapping_field import FIELD_MAPPING
from sqlalchemy.orm import Session
from admin.services.migration import create
from db.database import get_db
import httpx

# userinfo 모델 import missing 오류 방지용
from db.models.userinfo import UserInfo

migration_router = APIRouter(tags=["Migration"])

@migration_router.get("/migration")
async def get_migration(db: Session = Depends(get_db)) :
    try:
        response = await fetch_posts()
        header = response["response"]["header"]

        result_code = header.get("resultCode")
        result_msg = header.get("resultMsg")

        if result_code != "0000":
            raise HTTPException(
                status_code=502,
                detail=f"외부 API 오류: {result_msg}"
            )

        body = response["response"]["body"]
        items = (body.get("items") or {}).get("item") or []

        if isinstance(items, dict):
            items = [items]

        success_count = 0
        failed_items = []
        mapped_data = []

        for item in items:
            content_id = item.get("contentid")

            if not content_id:
                continue

            try:
                common_response = await fetch_posts_common(content_id)
                common_body = common_response["response"]["body"]

                if common_body.get("totalCount") == "1" :
                    item["hompage"] = common_body["items"]["item"]['homepage']
                    item["overview"] = common_body["items"]["item"]['overview']
                    success_count += 1

                intro_response = await fetch_posts_intro(content_id)
                intro_body = intro_response["response"]["body"]

                if intro_body.get("totalCount") == "1" :
                    item["eventplace"] = intro_body["items"]["item"]['eventplace']
                    item["program"] = intro_body["items"]["item"]['program']
                    success_count += 1

                mapped_data.append({
                    db_key: item[api_key]
                    for api_key, db_key in FIELD_MAPPING.items()
                    if api_key in item
                })

            except httpx.HTTPError:
                failed_items.append(content_id)

        result = create(db=db, datas=mapped_data)

        return {
            "total_count": len(items),
            "success_count": success_count,
            "result": result,
            # "items": items
        }

    except HTTPException:
        raise

    except httpx.HTTPError:
        raise HTTPException(
            status_code=502,
            detail="외부 API 호출 실패"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"데이터 처리 오류: {str(e)}"
        )