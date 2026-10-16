import httpx
from core.config import settings
from datetime import datetime
import xmltodict


url = "http://apis.data.go.kr/B551011/KorService2/"

async def fetch_posts():
    option = "searchFestival2"

    params = {
        "numOfRows" : 3,
        "pageNo" : 1,
        "MobileOS" : "WEB",
        "MobileApp" : "festival_gallery",
        "eventStartDate" : datetime.now().strftime("%Y%m%d"),  
        "serviceKey": settings.service_key
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url+option, params=params, timeout=10.0)
        response.raise_for_status()

        data = xmltodict.parse(response.text)

        return data


async def fetch_posts_common(content_id:str):
    option = "detailCommon2"
    params = {
        "MobileOS" : "WEB",
        "MobileApp" : "festival_gallery",
        "contentId" : content_id,  
        "serviceKey": settings.service_key
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url+option, params=params, timeout=10.0)
        response.raise_for_status()

        data = xmltodict.parse(response.text)
        
        return data

async def fetch_posts_intro(content_id:str):
    option = "detailIntro2"
    params = {
        "MobileOS" : "WEB",
        "MobileApp" : "festival_gallery",
        "contentId" : content_id,  
        "contentTypeId" : 15,
        "serviceKey": settings.service_key
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url+option, params=params, timeout=10.0)
        response.raise_for_status()

        data = xmltodict.parse(response.text)
        
        return data