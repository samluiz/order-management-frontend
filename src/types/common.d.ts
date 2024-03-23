export interface Pagination {
    total_pages: number
    total_elements: number
    current_page: number
    page_size: number
    next_page: number
    previous_page: number
}

export interface PaginatedResponse<T> {
    data: T[]
    pagination: Pagination
}