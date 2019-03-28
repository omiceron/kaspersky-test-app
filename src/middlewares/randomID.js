import v4 from 'uuid/v4'

export default store => next => action => {
    if (!action.generateId) return next(action)
    next({
        ...action,
        randomId: v4()
    })
}