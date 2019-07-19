const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'registers.json'))
const middlewares = jsonServer.defaults()

router.render = function (req, res) {
	var data = {}
	result = res.locals.data
	if(req.originalUrl.includes('/cities?id=')){
		for (var i = 0; i <= (result.length-1); i++) {
			data = {'area' : result[i].area, 'population' : result[i].population, 'history' : result[i].history};
		}
	} else {
		for (var i = 0; i <= (result.length-1); i++) {
			data[i] = {'id' : result[i].id, 'name' : result[i].name};
		}
	}
	res.jsonp(data)
}


server.use(middlewares)
server.use(router)
server.listen(3000, () => {
	console.log('JSON Server is running')
})