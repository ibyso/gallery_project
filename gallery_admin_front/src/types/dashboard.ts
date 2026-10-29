export interface ManagementCounts {
  pendingApprovals: number;
  privatePosts: number;
  deletedComments: number;
  blockedUsers: number;
}

export interface Metric {
  total: number;
  weeklyIncrease: number;
}

export interface OverviewMetrics {
  members: Metric;
  views: Metric;
  comments: Metric;
  likes: Metric;
}

export interface DailyActivity {
  date: string;
  newMembers: number;
  newComments: number;
}

export interface PopularPost {
  id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
}

export interface DashboardData {
  management: ManagementCounts;
  overview: OverviewMetrics;
  activity: DailyActivity[];
  popularPosts: PopularPost[];
}
