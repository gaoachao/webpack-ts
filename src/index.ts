import "./style/index.less";
import Food from './modules/Food'
import ScorePanel from './modules/ScorePanel'
import Snake from './modules/Snake'
import GameControl from "./modules/GameControl";

// 测试代码
const food = new Food();
console.log(food.X,food.Y);
food.change();
console.log(food.X,food.Y);

new GameControl();