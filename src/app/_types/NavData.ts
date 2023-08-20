type NavDataRoutePathGetter = string;

export type NavDataRouteTitleGetter = () => string;
export type NavDataRoutesTitles = Record<string, NavDataRouteTitleGetter>;

interface AtomicNavDataEntity {
  getTitle: NavDataRouteTitleGetter;
  getPath: NavDataRoutePathGetter;
}

export interface NavDataEntity extends AtomicNavDataEntity {
  otherEntities?: AtomicNavDataEntity[];
}

export type NavDataEntities = NavDataEntity[];
