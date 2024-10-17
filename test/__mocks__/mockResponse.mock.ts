import { Response} from 'express'

type typeMockResponse<TResult> = Response & {
    state: {
        status?: number,
        json?: TResult | unknown
    }
}

function makeMockResponse<TResult> () {
    const response = {
        state: {}
    } as typeMockResponse<TResult>
    
    response.status = (status: number) => {
        response.state.status = status
        return response
    }

    response.json = (json: TResult) => {
        response.state.json = json
        return response
    }

    return response
}

export default makeMockResponse