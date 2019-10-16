export function toAPI(store, action, conf) {
    const state = store.getState()
    fetch('http://' + state.process.API.host + ':' + state.process.API.port + '/api' + conf.url, {
        method: conf.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(conf.data)
    })
        .then(res => res.json())
        .then(result => {
            store.dispatch({
                ...action,
                result
            });
        })
        .catch(err => console.log(err))
}