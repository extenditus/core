export enum NOTIFY_CUSTOMER {
    EMA_RELOAD_PAGE = 'ema-reload-page', // We need to reload the ema page
    EMA_REQUEST_BOUNDS = 'ema-request-bounds',
    EMA_EDITOR_PONG = 'ema-editor-pong'
}

// All the custom events that come from the JSP Iframe
export enum NG_CUSTOM_EVENTS {
    EDIT_CONTENTLET_LOADED = 'edit-contentlet-loaded',
    CONTENT_SEARCH_SELECT = 'select-contentlet',
    CREATE_CONTENTLET = 'create-contentlet-from-edit-page',
    SAVE_PAGE = 'save-page',
    FORM_SELECTED = 'form-selected'
}

// The current state of the editor
export enum EDITOR_STATE {
    LOADING = 'loading',
    IDLE = 'idle',
    DRAGGING = 'dragging',
    ERROR = 'error'
}

export enum EDITOR_MODE {
    EDIT = 'edit',
    EDIT_VARIANT = 'edit-variant',
    PREVIEW_VARIANT = 'preview-variant',
    DEVICE = 'device',
    SOCIAL_MEDIA = 'social-media'
}
