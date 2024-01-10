export interface ActionPayload {
    container: ContainerPayload;
    contentlet?: ContentletPayload;
    language_id: string;
    pageContainers: PageContainer[];
    pageId: string;
    personaTag?: string;
    position?: 'before' | 'after';
    newContentletId?: string;
}

export interface PageContainer {
    personaTag?: string;
    identifier: string;
    uuid: string;
    contentletsId: string[];
}

export interface ContainerPayload {
    acceptTypes: string;
    identifier: string;
    contentletsId: string[];
    maxContentlets: number;
    uuid: string;
}

interface ContentletPayload {
    identifier: string;
    inode: string;
    title: string;
}
export interface SetUrlPayload {
    url: string;
}

export interface SavePagePayload {
    pageContainers: PageContainer[];
    pageId: string;
    whenSaved?: () => void;
}

export interface NavigationBarItem {
    icon?: string;
    iconURL?: string;
    label: string;
    href?: string;
    action?: () => void;
    isDisabled?: boolean;
}
