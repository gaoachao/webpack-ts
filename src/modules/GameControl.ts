import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";


//游戏控制器，控制其他的类
class GameControl{
	snake:Snake;
	food:Food;
	scorePanel:ScorePanel;
	//存储按键方向
	direction:string = 'Right';
	//判断游戏是否结束
	isLive:boolean = true;


	constructor(){
		this.snake = new Snake();
		this.food = new Food();
		this.scorePanel = new ScorePanel();


		this.init();
	}

	//游戏的初始化方法，调用后游戏即开始
	init(){
		//绑定键盘按键按下的事件
		//把keydownHandler绑定给了document，所以在keydownHandler中this.direction的this指向document
		//因此要用 this.keydownHandler.bind(this)
		document.addEventListener('keydown',this.keydownHandler.bind(this));

		this.run();
	}


	// 创建一个键盘按下的响应函数，写外面便于维护
	keydownHandler(event:KeyboardEvent){
		//阻止默认事件，以禁止按下键盘的同时影响滚动条
		event.preventDefault();
		//获取键盘按键按下的按键（返回字符串）
		this.direction = event.key;
	}

	// 创建让蛇移动的方法
	run(){
		let X = this.snake.X;
		let Y = this.snake.Y;

		switch(this.direction){
			case "ArrowUp":
			case "Up":
				Y -= 10;
				break;
			case "ArrowDown":
			case "Down":
				Y += 10;
				break;
			case "ArrowLeft":
			case "Left":
				X -= 10;
				break;
			case "ArrowRight":
			case "Right":
				X += 10;
				break;
		}

		this.checkEat(X,Y);

		//对异常进行捕获
		try{
			this.snake.X = X;
			this.snake.Y = Y;
		}catch(e:any){
			//进入到catch说明try里面的代码引起了error
			alert(e.message+'  GAME OVER!');
			this.isLive = false;
		}

		
		this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level - 1)*30);
	}

	//检查蛇是否吃到是否
	checkEat(X:number,Y:number){
		if(X === this.food.X && Y === this.food.Y){
			this.food.change();
			this.scorePanel.addScore();
			this.snake.addBody();
		}
	}
}

export default GameControl;