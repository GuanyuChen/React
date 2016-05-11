import React, {
	Component
} from 'react';

class DemoComponent extends Component {
	render() {
		return <h1>Hello World</h1>
	}
}

class Animal {
	constructor(name) {
		this.name = name;
	}

	sayName() {
		console.log('name=' + this.name);
	}
}

class Tiger extends Animal {
	constructor(name) {
		//直接调用父类的构造器进行初始化
		super(name);
	}

	programmer() {
		console.log('imcoding');
	}
}

var na = new Animal('dog'),
	cgy = new Tiger('cgy');