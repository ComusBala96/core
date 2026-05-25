// Routes types

export type Awaitable<T> = T | Promise<T>;

export type PageModule = {
    default?: () => Awaitable<void>;
    init?: () => Awaitable<void>;
};

export type PageImporter = () => Promise<PageModule>;

export type RouteAction = 'index' | 'create' | 'edit' | 'save' | 'delete' | 'show' | 'store' | 'update' | 'destroy' | 'custom';

export interface RouteMeta {
    alias?: string;
    name?: string;
    [key: string]: any;
}

export interface RouteDefinition {
    patterns: string[];
    importer: PageImporter;
    meta?: RouteMeta;
}

export interface MatchResult {
    matched: boolean;
    pattern?: string;
    params: Record<string, string>;
    route?: RouteDefinition;
}

export interface ResourceOptions {
    param?: string;
    actions?: RouteAction[];
    only?: RouteAction[];
    except?: RouteAction[];
    shifted?: boolean;
    trailingParam?: boolean;
    meta?: RouteMeta;
}

export interface GroupOptions {
    meta?: RouteMeta;
}
