class Snake{
	//表示蛇的元素
	head:HTMLElement;
	//表示蛇的身体，包括头部，是一个实时刷新的集合。
	bodies:HTMLCollection;
	//蛇身体的容器
	element:HTMLElement;

	constructor(){
		//querySelector只会取第一个元素
		this.head = document.querySelector('#snake > div')!;
		//不用querySelectorAll 因为querySelectorAll返回的是NodeListOf，每一次增加了身体长度都需要重新获取一次
		//getElementsByTagName返回的是HTMLCollection
		this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
		this.element = document.getElementById('snake')!;
	}

	get X(){
		return this.head.offsetLeft;
	}

	get Y(){
		return this.head.offsetTop;
	}

	set X(value:number){

		//如果新值与旧值相同就没有必要修改
		if(this.X === value){
			return;
		}

		//修改X的时候，如果往左走就不能向右掉头
		//如果第二节，且第二节的offsetLeft与按下后改变的value值相同，则判断为调头了
		if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
			//value > this.X表示向右调头了
			if(value > this.X){
				//相当于抵消了这一次按下键盘加的10
				value = this.X - 10;
			}else{
				value = this.X + 10;
			}
		}
		
		// 0 <= X <= 290
		if(value < 0 || value > 290){
			throw new Error('蛇撞墙');
		}
		this.moveBody();
		this.head.style.left = value + 'px';
		this.checkHeadBody();
	}

	set Y(value:number){
		if(this.Y === value){
			return;
		}
		if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
			if(value > this.Y){
				value = this.Y - 10;
			}else{
				value = this.Y + 10;
			}
		}
		if(value < 0 || value > 290){
			throw new Error('蛇撞到墙了！');
		}
		this.moveBody();
		this.head.style.top = value + 'px';
		this.checkHeadBody();
	}

	//蛇增加身体长度的方法
	addBody(){
		//insertAdjacentHTML()第一个参数是头部还是尾部添加，第二个HTML代码
		//adjacent(adj.)邻近的，毗邻的
		this.element.insertAdjacentHTML("beforeend","<div></div>")
	}

	//蛇的身体的移动
	moveBody(){
		//将后一节设置为前一节的位置
		for(let i=this.bodies.length-1;i>0;i--){
			//获取前一节身体的位置
			//HTMLCollection中的类型是Element，但需要HTMLElement，所以要进行一个类型断言
			let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
			let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

			(this.bodies[i] as HTMLElement).style.left = X + 'px';
			(this.bodies[i] as HTMLElement).style.top = Y + 'px';
		}
	}

	//检查蛇头与身体相撞
	checkHeadBody(){
		for(let i = 1;i<this.bodies.length;i++){
			let bd = this.bodies[i] as HTMLElement;
			if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
				throw new Error('蛇撞到自己了！');
			}
		}
	}

}

export default Snake;