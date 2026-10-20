"""rename like table to festival_likes

Revision ID: 37f934b7c3e1
Revises: 07a6994fce68
Create Date: 2026-10-20 10:05:29.054575

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '37f934b7c3e1'
down_revision: Union[str, Sequence[str], None] = '07a6994fce68'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.rename_table("like", "festival_likes")


def downgrade() -> None:
    """Downgrade schema."""
    op.rename_table("festival_likes", "like")
