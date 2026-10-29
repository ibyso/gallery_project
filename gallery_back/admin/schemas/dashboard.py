from pydantic import BaseModel


class ManagementCounts(BaseModel):
    pendingApprovals: int
    privatePosts: int
    deletedComments: int
    blockedUsers: int


class Metric(BaseModel):
    total: int
    weeklyIncrease: int


class OverviewMetrics(BaseModel):
    members: Metric
    views: Metric
    comments: Metric
    likes: Metric


class DailyActivity(BaseModel):
    date: str
    newMembers: int
    newComments: int


class PopularPost(BaseModel):
    id: int
    title: str
    views: int
    likes: int
    comments: int


class DashboardData(BaseModel):
    management: ManagementCounts
    overview: OverviewMetrics
    activity: list[DailyActivity]
    popularPosts: list[PopularPost]