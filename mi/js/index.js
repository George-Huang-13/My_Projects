window.onload = function () {
    var imgArry = document.querySelectorAll(".img");
    var imglist = document.querySelector(".img-list");
    // console.log(imglist);
    // 设置存储图片的列表宽度,使得img元素能够横向排列在其中
    imglist.style.width = 1226 * imgArry.length + 'px';
    // 获取四个导航点
    var Alla = document.querySelectorAll(".pointer-item");
    // 设置导航点的索引初始值
    var index = 0;
    // 为第一张图片设置默认选中状态
    Alla[index].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    //获取左右两个箭头
    var arrowPre = document.querySelector(".pre");
    var arrowAfter = document.querySelector(".after");
    // console.log(arrowAfter);

    // 为每一个超链接添加响应事件
    for(var i = 0; i < Alla.length; i++){
        // 为每一个超链接添加唯一标识编号
        Alla[i].num = i;
        Alla[i].onclick = function(){
            // 点击按钮后自动切换停止
            clearInterval(timer);
            // 将每个超链接的编号返回给index
            index = this.num;
            // 使用方法pointA来设置按钮的背景颜色
            pointA();
            // 使用move函数实现图片移动效果
            move(imglist, 30, -1226 * index, "left", function(){
                // 动画结束后开启自动切换
                autoChange();
            })
        };
    }

    // 为向前箭头添加响应事件
    arrowPre.onclick = function(){
        clearInterval(timer);
        // 判断图片的当前索引
        if(index > 0){
            index -= 1;
        }else{
            index = imgArry.length - 2;
        }
        // console.log(index);
        pointA();
        move(imglist, 30, -1226 * index, "left", function(){
            autoChange();
        });
    };

    // 为向后箭头添加响应事件
    arrowAfter.onclick = function(){
        clearInterval(timer);
        // 判断图片的当前索引
        if(index < imgArry.length - 1){
            index += 1;
        }else{
            imglist.style.left = 0;
        }
        // console.log(index);
        pointA();
        move(imglist, 30, -1226 * index, "left", function(){
            autoChange();
        });
    };


    autoChange();
    // 创建一个方法用来设置按钮的效果
    function pointA() {
        // 判断图片是否切换到了最后一张
        if (index >= imgArry.length - 1) {
            index = 0;
            // 通过修改CSS，使图片瞬间切换到最左侧
            imglist.style.left = 0;
        }

        for (var i = 0; i < Alla.length; i++) {
            // 设置所有未被选中的超链接的背景颜色(注意:最后不附值给颜色,因为JS修改样式的优先级会较高,这样就会使hover效果消失)
            Alla[i].style.backgroundColor = "";
        }
        // 设置点击中的超链接的背景颜色
        Alla[index].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    };


    // 创建一个自动切换函数
    var timer;
    function autoChange() {
        timer = setInterval(function () {
            index++;
            // 判断列表长度
            index = index % imgArry.length;
            move(imglist, 30, -1226*index, "left", function(){
                // 设置按钮的状态跟随图片切换
                pointA();
            });
        }, 4000)
    };


};

