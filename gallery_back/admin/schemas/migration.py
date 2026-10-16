from pydantic import BaseModel,Field
from decimal import Decimal
from datetime import datetime


class migrationInsert(BaseModel):
    id: int
    title: str = Field(..., max_length=200)

    addr1: str | None = Field(None, max_length=200)
    addr2: str | None = Field(None, max_length=200)

    startdate: str | None = Field(None, min_length=8, max_length=8)
    enddate: str | None = Field(None, min_length=8, max_length=8)

    thumbnail: str | None = Field(None, max_length=200)

    mapx: Decimal | None = Field(None, max_digits=13, decimal_places=10)
    mapy: Decimal | None = Field(None, max_digits=13, decimal_places=10)

    tel: str | None = Field(None, max_length=13)
    zipcode: int | None = None

    homepage: str | None = Field(None, max_length=200)
    overview: str | None = Field(None, max_length=200)
    playtime: str | None = Field(None, max_length=200)
    eventplace: str | None = Field(None, max_length=200)
    program: str | None = Field(None, max_length=2000)