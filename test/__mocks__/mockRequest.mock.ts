import { Params, Query } from 'express-serve-static-core'
import { Request } from 'express'

interface mockRequest {
    params?: Params
    query?: Query
    body?: Body
}

const makeMockRequest = ({ params, query, body }: mockRequest): Request => {
    const request = {
        params: params || {},
        query: query || {},
        body: body || {}
    } as unknown

    return request as Request
}

export default makeMockRequest