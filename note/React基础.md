[TOC]

## React基础

> React是一个用于构建用户界面的JavaScript库

### React简介

* 只关注UI
    `许多人使用React作为MVC架构的View层。`
* 虚拟DOM特性
    `React为了更高超的性能来使用虚拟DOM作为不同实现。它同时也可以由服务端Node.js渲染 不需要过重的浏览器DOM支持`
* 单向数据流
    `React实现了单向响应的数据流，从而减少了重复代码，所以比传统的数据绑定简单`

#### 一个简单的React组件及其渲染

React组件通过一个`render()`方法，接受输入的参数并返回展示对象。

下面例子输入的参数通过render()传入组件后，将存储在this.props

`ES5写法`

```
var React = require('react');
var ReactDOM = require('react-dom');

//定义组件
var HelloMessage = React.createClass({
    render:function(){
        return <div>React,我来了</div>;
    }
});

//渲染组件
ReactDOM.render(<HrlloMessage />, rootElement);
```

`ES6写法`

```
import React,{ Component } from 'react';
import { Render } from 'react-dom';

//定义组件
class SimpleComponent extends Component {
    render(){
        return <div>React,我来了</div>;
    }
}

//组件渲染
render(<HelloMessage />,rootElement);
```

#### 顶层API

`react.js`

```
React.Children: Object
React.Component: ReactComponent(props, context, updater)
React.DOM: Object
React.PropTypes: Object
React.cloneElement: (element, props, children)
React.createClass: (spec)
React.createElement: (type, props, children)
React.createFactory: (type)
React.createMixin: (mixin)
React.isValidElement: (object)
```

`omponent API`

```
this.context: Object
this.props: Object
this.refs: Object
this.state: Object
this.setState: Object
```

`react-dom.js`

```
ReactDOM.findDOMNode: findDOMNode(componentOrElement)
ReactDOM.render: ()
ReactDOM.unmountComponentAtNode: (container)
```

`react-dom-server.js`

```
ReactDOMServer.renderToString
ReactDOMServer.renderToStaticMarkup
```

### JSX语法

#### 1.什么是 JSX 

类似 xml 的语法，来描述组件树

```
var HelloMessage = React.createClass({
    render:function(){
        return <div>Hello {this.props.name}</div>
    }
});

React.render(<HelloMessage name="nick" />,mountNode);
```

JSX 是可选的，并不强制要求使用。如果不用JSX,用React提供的api写，是这样的：

```
var HelloMessage = React.createClass({
    displayName : "HelloMessage",
    render : function(){
        return React.createElement("div", null, "Hello ", this.props.name);
    }
    });

React.render(React.createElement(HelloMessage, {Name : "nick"}), mountNode);
```

**JSX 定义了简介且我们熟知的包含属性的树状结构语法**

#### 2.注释 & 命名

```
import react,{ Component } from 'react';

const name = 'guanyu';
const MyComponent = () => {
    <nav>
    {/* 一般注释用{}包围 */}
    /*
    多
    行
    注
    释
     */
    </nav> // 行尾注释
}

export default MyComponent
```

组件命名遵循驼峰命名，每个单词首字母大写 比如 ComponentDemo。

#### 3.根元素个数

React只有一个限制，组件只能渲染单个节点。如果你想返回多个节点，它们必须包含在同一个节点里。

```
import react, { Component } from 'react';

class ComponentDemo extends Component {
    render(){
        //以下写法直接报错
        return (
            <div>hello</div>
            <h1>hello h1</h1>
        );
    }
}

export default Component;
```

#### 4.嵌入变量

`{}花括号内可以写JS逻辑，表达式和方法定义都可以`

    let person = <Person name={window.isLoggedIn ? window.name : ''} />;

#### 5.styles

```
import react ,{ Component } from 'react';

class StyleDemo extends Component {
    render(){
        //在JS文件里给组件定义样式
        var MyComponentStyles = {
            color : 'blue',
            fontSize : '28px' 
        };

        return (
            <div style={MyComponentStyles}>
                可以直接这样写行内样式
            </div>
        )
    }
}

return deafult StyleDemo;
```

#### 6.JSX SPREAD

可以通过 `{...obj}` 来批量设置一个对象的键值对来得到组件的属性。

```
import React, { Component } from 'react';

class SpreadDemo extends Component {
    componentWillMount(){
        console.log(this.props);
    }

    render(){
        return <h1> {this.props.name} is a {this.props.type}</h1>
    }
}

export default SpreadDemo;
```

PS : 属性名不能和JS关键字重复

### 数据流

#### 1.state setState

可以把组件当成一个状态机，我们给组件传入数据作为输入，组件在内部进行逻辑处理，返回一个HTML当做输出。

而传入的数据即为props，组件内部的状态控制即为state，每一次状态对应组件的一个UI。

```
import React ,{ Component } from 'react';

class StateDemo extends Component {
    state = {
        secondsElapsed: 0
    }

    tick(){
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1});
    }

    componentDidMount(){
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        return (
            <div>目前已经计时：{this.state.secondsElapsed}秒</div>
        )
    }
}

export default StateDemo;
```

#### 2.props

通过 `this.props` 可以获取传递给该组件的属性值，还可以通过定义getDefaultProps来指定默认属性值(ES5写法)，ES6可以直接在定义组件时写props来指定默认属性值。

props常用API：

* this.props.children
* this.props.map
* this.props.filter

**props是调用组件的时候传递进去的数据，一般用于组件树数据传递**

```
import React, { Component } from 'react';

class PropsDemo extends Component {
    props = {
        title : '这是默认的title属性值'
    }

    render(){
        console.log(this.props);

        return <b>{this.props.title}</b>
    }
}

export default PropsDemo;


//调用组件方式
//<PropsDemo title="设置的标题" />
```

#### 3.protoTypes

通过指定 protoTypes 可以校验props属性值的类型，校验可以提升开发者体验，用于约定统一的接口规范。

```
import React, { Component, protoTypes } from 'react';

class ProtoTypesDemo extends Component {
    render(){
        return <b>{this.props.title}</b>
    }
}

ProtoTypesDemo.defaultProps = {
    title : '默认的title'
}

ProtoTypesDemo.protoTypes = {
    title : ProtoTypes.string.isRequired
}

export default PropTypesDemo;
```

### 定义组件

用 `React.createClass` 或者 `React.Component` 定义组件时允许传入相应的配置及组件API的使用，包括组件生命周期提供的一些列钩子函数

#### 1.组件初始定义

* getDefaultProps 得到默认属性对象 (ES6时不需要)
* propTypes 属性检验规则
* mixins 组件间公用方法

#### 2.初次创建组件时调用

* getInitialState 得到初始状态对象
* render 返回组件树 必须设置！
* componentDidMount 渲染到组件树时调用，只在客户端调用，用于获取原生节点

#### 3.组件的属性值改变时调用

* componentWillReceiveProps 属性改变调用
* shouldComponentUpdate 判断是否需要重新渲染
* render 返回组件树 必须设置！
* componentDidUpdate 渲染到组件树时调用，可用于获取原生节点

#### 4.销毁组件

* componentWillUnmount 组件从dom销毁前调用

#### 示例 & 组件渲染过程

```
import React, { Component } from 'react';

class LifeCycle extends Component {
    props = {
        value:'开始渲染'
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        this.setState({
            value: nextProps.value
        });
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps,nextState){
        console.log('componentWillUpdate');
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    render(){
        console.log(render);
        return <span>{this.props.value}</span>
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    componentDidUpdate(prevProps,prevState){
        console.log('componentDidUpdate');
    }

    componentWillUnmount(prevProps,prevState){
        console.log('componentWillUnmount');
    }
}

export default LifeCycle;
```

调用组件并销毁组件示例

```
import React, { Component } from 'react';
import LifeCycle from './LifeCycleDemo';

class DestoryComponent extends Component {
    state = {
        value:1,
        destroyed:false
    }

    increase = () => {
        this.setState({
            value:this.state.value + 1
        });
    }

    destroy = () => {
        thid.setState({
            destroyed:true
        });
    }

    render(){
        if(this.state.destroyed){
            return null;
        }

        return <div>
            <p>
                <button onClick={this.increase}>每次加一</button>
                <button onClick={this.destroy}>干掉这两个按钮</button>
            </p>
            <LifeCycleDemo value={this.state.value} />
        </div>;
    }
}

export default DestoryComponent;
```

组件渲染过程

```
# 创建 -> 渲染 -> 销毁

getDefaultProps()
getInitialState()
componentWillMount()
render()
componentDidMount()
componentWillUnmount()

# 更新组件

componentWillReceiveProps()
shouldComponentUpdate()
render()
componentDidUpdate()
```

### DOM操作

`React 中获取DOM的两种方式`

* ReactDOM.findDOMNode
* this.refs.xxx

获取DOM后可以方便的结合现有非react类库的使用，通过ref/refs可以取得组件实例，进而取得原生节点。

尽量通过state/props更新组件，不要使用该功能去更新组件的DOM

`示例一`

```
import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

class HandleDOMComponent extends Component {
    componentDidMount(){
        //以下两种方式都可以获取到元素
        let ele = findDOMNode(this.refs.content);
        let ele2 = this.refs.content;

        //如果想用jquery 那么这是个好时机
        console.log( ele );
        console.log( ele.innerHTML );
        console.log( ele2.innerHTML );
    }

    render(){
        return (
            <div>
                <h3>来吧，一起操作DOM</h3>
                <div ref='content'>这是DOM元素里的内容</div>
            </div>
        );
    }
}

export default HandleDOMComponent;
```

`示例二`

```
import React,{ Component } from 'react';
import ReactDOM,{ findDOMNode } from 'react-dom';

class Refs extends Component {
    state = {
        red:0,
        green:0,
        pink:0
    }
    update = (e) => {
        this.setState({
            red:findDOMNode(this.refs.red).value,
            green:findDOMNode(this.refs.green).value,
            pink:findDOMNode(this.refs.pink).value
        })
    }
    render(){
        return (
            <div>
                <Slider ref='red' update={this.update} />
                {this.state.red}
                <br />
                <Slider ref="green" update={this.update} />
                {this.state.green}
                <br />
                <Slider ref="ponk" update={thiis.update} />
                {this.state.pink}
            </div>
        )
    }
}

class Slider extends Component {
    render(){
        return (
            <input type="range" name="inp" 
                min="0"
                max="255"
                onChange={this.props.update} />
        )
    }
}

export default Refs;
```

### 事件

可以通过设置原生DOM组件的`onEventType`属性来监听dom事件，例如onClick,onMouseDown,在加强组件内聚性的同时，避免了传统html的全局变量污染

```
'use strict'

import React,{ Component } from 'react';

class HandleEvent extends Component {
    state = {liked:false}

    handleClick = (event) => {
        this.setState({liked: !this.state.liked});
    }

    render(){
        let text = this.state.liked ? '喜欢' : '不喜欢';

        return (
            <p onClick={this.handleClick}>
                我{text}你
            </p>
        )
    }

    export default HandleEvent;
}
```

**事件回调函数参数为标准化的事件对象，可以不用考虑IE**

### 组件嵌套

组件间的嵌套是在开发过程中最为常用的。

#### 1. 受限组件 && 非受限组件

受限组件示例:

```
render(){
    return <input type="text" name="inp" value="Hello!" />
}
```

非受限组件示例:

```
render(){
    return <input type="text" />
}
```

#### 2. 使用自定义的组件

```
'use strict'

impot React, { Component } from 'react';

class ComponentA extends Component{
    render(){
        return <a href="#">我是组件A</a>
    }
}

class ComponentB extends Component{
    render(){
        return <a href="#">我是组件B</a>
    }
}

class SelfCreateComponent extends Component{
    render(){
        return(
            <i>
                <ComponentA />
                <ComponentB />
            </i>
        );
    }
}

export default SelfCreateComponent;
```

#### 3. 使用 CHILDREN 组合

```
'use strict'

import React,{ Component } from 'react';

//定义一个组件，通过React.children拿到组件里面的子元素
class ListComponent extends Component{
    render(){
        return <ul>
            {
                React.children.map( this.props.children, function(c){
                    return <li>{c}</li>
                })
            }
        </ul>
    }
}

class UseChildrenComponent extends Component{
    render(){
        return (
            <ListComponent>
                <a href="#">Facebook</a>
                <a href="#">Google</a>
                <a href="#">SpaceX</a>
            </ListComponent>
        )
    }
}

export default UseChildrenComponent;
```

### 表单操作

#### 1. React表单组件和html的不同点

* `value/checked`属性设置后，用户输入无效
* `textarea`的值要设置在`value`属性

`<textarea name="description" value="This is a description ."/>`

* `select` 的 `value` 属性可以是数组，不建议使用`option` 的 `selected`属性

```
<select multiple={true} value={['B','C']}>
    <option value="A">Apple</option>
    <option value="B">Banana</option>
    <option value="C">Cranberry</option>
</select>
```

* `input/textarea` 的 `onChange` 用户每次输入都会触发(即时不是去焦点)
* `radio/checkbox/option` 点击后触发 `onChange`

#### 2. 综合表达组件示例

1. 定义复选框组件Checkboxes

```
import React, { Component } from 'react';
class Checkboxes extends Component {
    render(){
        return <span>
            A<input onChange={this.props.handleCheck} type="checkbox" name="goodCheck" value="A">
            B<input onChange={this.props.handleCheck} type="checkbox" name="goodCheck" value="B">
            C<input onChange={this.props.handleCheck} type="checkbox" name="goodCheck" value="C">
        </span>
    }
}
export default Checkboxes;
```

2. 定义单选框组件RadioButtons

```
import React, { Component } from 'react';
class RadioButtons extends Component{
    saySomething(){
        alert('我是一个单选框按钮');
    }

    render(){
        return <span>
            A<input onChange={this.props.handleRadio} type="radio" name="goodRadio" value="A" />
            B<input onChange={this.props.handleRadio} type="radio" name="goodRadio" value="B" />
            C<input onChange={this.props.handleRadio} type="radio" name="goodRadio" value="C">
        </span>
    }
}
export default RadioButtons;
```

示例：

**FormApp组件集成两个组件并处理表单逻辑** 

```
'use strict'

import React, { Component } from 'react';
import Checkboxes from './Checkboxes';
import RadioButtons from './RadioButtonsadio';

class FormApp extends Component{
    state = {
        inputValue:'请输入。。。',
        selectValue:'A',
        radioValue:'B',
        checkValue:[],
        textareaValue:'请输入...'
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let formData = {
            input: this.refs.goodInput.value,
            select: this.refs.goodSelect.value,
            textarea: this.refs.goodTextarea.value,
            radio: this.state.radioValue,
            check: this.state.checkValues,
        }

        alert('您即将提交表单');
        console.log('你提交的数据是:');
        console.log(formData);
    }

    handleRadio = (e) => {
        this.setState({
            radioValue: e.target.value,
        })
    }

    handleCheck = (e) => {
        let checkValues = this.state.checkValues.slice();
        let newVal = e.target.value;
        let index = checkValues.indexOf(newVal);

        if(index == -1){
            checkValues.push(newVal);
        }else{
            checkValues.splice(index,1);
        }

        this.setState({
            checkValues:checkValues,
        })
    }

    render(){
        return <form onSubmit={this.handleSubmit}>
            <h3>请输入内容</h3>
            <input ref="goodInput" type="text" defaultValue={this.state.inputValue}/>
            <br/>

            <h3>请选择</h3>
            <select defaultValue={this.state.selectValue} ref="goodSelect">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
            </select>
            <br/>

            <h3>单项选择</h3>
            <RadioButtons ref="goodRadio" handleRadio={this.handleRadio} />
            <br/>

            <h3>多选按钮</h3>
            <checkboxes handleCheck={this.handleCheck} />
            <br/>

            <h3>反馈建议</h3>
            <textarea defaultValue={this.state.textareaValue} ref="goodTextarea"></textarea>
            <br/>

            <button type="submit">确认提交</button>
        </form>
    }
}
export default FormApp;
```

### mixin

mixin 是一个普通对象，通过mixin可以在不同组件间共享代码，使你的React程序变得更为可重用。

**PS : ES6语法不支持mixin写法，而是可以通过decorator去实现代码共享**

#### ES5 语法实现 mixin

```
import React from 'react';

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var MixinDemo = React.createClass({
  // Use the mixin
  mixins: [SetIntervalMixin],
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    // Call a method on the mixin
    this.setInterval(this.tick, 1000);
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        计时器已经运行了： {this.state.seconds} 秒.
      </p>
    );
  }
});

export default MixinDemo;
```

####  用high-order component的方式实现

```
import React, { Component } from 'react';

let Mixin = MixinComponent => class extends Component {
  constructor() {
    super();
    this.state = { val: 0 };
    this.update = this.update.bind(this);
  }
  update(){
    this.setState({val: this.state.val + 1});
  }
  componentWillMount(){
    console.log('will mount...')
  }
  render(){
    return (
      <MixinComponent
        update={this.update}
        {...this.state}
        {...this.props}
       />
    )
  }
  componentDidMount(){
    console.log('mounted...')
  }
}

const Button = (props) => {
  return (
    <button onClick={props.update}>
      {props.txt} - {props.val}
    </button>
  )
}

const Label = (props) => {
  return (
    <label onMouseMove={props.update}>
      {props.txt} - {props.val}
    </label>
  )
}

let ButtonMixed = Mixin(Button);
let LabelMixed = Mixin(Label);

class Mixins extends Component {
  render(){
    return (
      <div>
        <ButtonMixed txt="button" />
        <LabelMixed txt="label" />
      </div>
    )
  }
}

export default Mixins;
```




