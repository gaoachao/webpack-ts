// 定义实物类 Food
class Food {
  //定义一个属性表示食物所对应的元素
  element: HTMLElement;
  constructor() {
    // 获取页面中的food元素赋值给element，加个叹号表示这个元素不可能为空（只是告诉TS）
    this.element = document.getElementById("food")!;
  }
  // 定义一个获取食物X轴坐标的方式
  get X() {
    //返回当前元素相对于其 offsetParent 元素的左部内边距的距离。
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  //修改食物位置的方法
  change() {
    //  0<= X <= 300-10
    // 一次移动 10 ，即食物的坐标必须要整10
    // math.round 为四舍五入取整  math.floor 为向下取整
    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;

    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}

export default Food;