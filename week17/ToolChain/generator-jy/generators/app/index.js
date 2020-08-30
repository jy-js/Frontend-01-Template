var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
		
		this.option('babel');
		
		this.helperMethod = function (){
			console.log('won\'t be called automatically');
		}
		this.argument("appname", {type: String, required: true});
		this.log(this.options.appname);
	}
	method1() {
		this.log('hello, method 1 just ran');
	}
	method2() {
		this.log('hello, method 2 just ran');
	}
	_private_method() {
		console.log('private method.');
	}
	
	async promting() {
		this.dependency = await this.prompt([
			{
				type: "input",
				name: "name",
				message: "Your project name",
				default: this.appname
			},
			{
				type: "confirm",
				name: "cool",
				message: "Would you like to enable the Cool feature?"
			}
		]);
		
		this.log("app name", this.dependency.name);
		this.log("cool feature", this.dependency.cool);
	}
	testTestTemplate() {
		this.fs.copyTpl(
			this.templatePath('index.html'),
			this.destinationPath('public/index.html'),
			{title: this.dependency.name}
		);
	}
	writing() {
		const pkgJson = {
			dependencies: {
				[this.dependency.name]: '*'
			}
		}
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}
	
	async installingLoadash() {
		this.npmInstall();
	}
};