from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    oracle_user: str = Field(alias="ORACLE_USER")
    oracle_password: str = Field(alias="ORACLE_PASSWORD")
    secret_key: str = Field(alias="SECRET_KEY")
    service_key: str = Field(alias="SERVICE_KEY")

settings = Settings()