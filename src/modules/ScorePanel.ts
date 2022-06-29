// 计分牌的类
class ScorePanel {
  //score 和 level 用来记录分数和等级
  score = 0;
  level = 1;

	//分数和等级所在的元素，在构造函数内进行初始化
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

	//设置一个变量限制等级
	maxLevel:number;

	//设置一个变量表示升级所需要的分数
	upScore:number;


  //分数和等级所在元素，在构造函数中进行初始化
	//在构造函数内让maxLevel=10，意思是默认值，如果不传参则maxLevel为10
  constructor(maxLevel:number = 10,upScore:number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
		this.maxLevel = maxLevel;
		this.upScore = upScore;
  }

  //设置加分的方法
  addScore() {
    //使分数自增
    this.score++;
    //是个字符串，需要通过拼串的方法转换过去
    this.scoreEle.innerHTML = this.score + "";

		//分数每上10则升一级
		if(this.score % this.upScore === 0){
			this.levelUp();
		}
  }

  //提升等级的方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      //是个字符串，需要通过拼串的方法转换过去
      this.scoreEle.innerHTML = this.level + "";
    }
  }
}

export default ScorePanel;