const { exec } = require('node:child_process')

// run the command scripts to build the app
module.exports.build = () =>
	exec('sh ./shell-scripts/build.sh', (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stdout)
	})

// run the command scripts to run all tests
module.exports.test = () =>
	exec('sh ./shell-scripts/tests.sh', (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stdout)
	})

// run the command scripts to run the development server
module.exports.dev = () =>
	exec('sh ./shell-scripts/dev.sh', (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stdout)
	})
