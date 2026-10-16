"""userinfo table add column

Revision ID: 3c56f5050236
Revises: 787a9f7bbe32
Create Date: 2026-10-16 15:06:21.333230

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import oracle

# revision identifiers, used by Alembic.
revision: str = '3c56f5050236'
down_revision: Union[str, Sequence[str], None] = '787a9f7bbe32'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.add_column(
        'UserInfo',
        sa.Column('age', sa.Integer(), nullable=False)
    )

    op.add_column(
        'UserInfo',
        sa.Column('gender', sa.String(length=10), nullable=False)
    )

    op.create_check_constraint(
        'ck_userinfo_gender',
        'UserInfo',
        "gender IN ('Male', 'Female')"
    )

    op.create_check_constraint(
        'ck_userinfo_role',
        'UserInfo',
        "role IN ('Admin', 'Manager', 'Member')"
    )

    op.alter_column(
        'UserInfo',
        'updated_at',
        existing_type=oracle.DATE(),
        nullable=True
    )

    op.alter_column(
        'UserInfo',
        'last_login',
        existing_type=oracle.DATE(),
        nullable=True
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_constraint(
        'ck_userinfo_role',
        'UserInfo',
        type_='check'
    )

    op.drop_constraint(
        'ck_userinfo_gender',
        'UserInfo',
        type_='check'
    )

    op.alter_column(
        'UserInfo',
        'last_login',
        existing_type=oracle.DATE(),
        nullable=False
    )

    op.alter_column(
        'UserInfo',
        'updated_at',
        existing_type=oracle.DATE(),
        nullable=False
    )

    op.drop_column('UserInfo', 'gender')
    op.drop_column('UserInfo', 'age')
    # ### end Alembic commands ###
