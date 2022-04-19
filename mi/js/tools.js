// 元素移动函数
function move(obj, speed, target, attr, callback) {
    // 每点击一次按钮关闭上一次开启的定时器,防止定时器重叠
    clearInterval(obj.timer);
    // 获取元素的位置,判断速度的正负
    var current = parseInt(getStyle(obj, attr));
    // 判断初始位置与目标位置的关系
    if (current > target) {
        speed = -speed;
    }

    // 向执行动画的对象中添加一个timer属性,用来保存自己的定时器标识,使多个元素之间不会受影响
    obj.timer = setInterval(function () {
        // 获取当前元素的位置的值
        var oldValue = parseInt(getStyle(obj, attr));
        // 设置移动的频率(速度)
        var newValue = oldValue + speed;
        // 判断元素位置与终点的位置,使得不同速度下也能到达同一个终点
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }
        obj.style[attr] = newValue + "px";
        // 给元素设置一个终点位置
        if (newValue == target) {
            clearInterval(obj.timer);
            // 上述代码执行完毕后执行回调函数内容
            callback && callback();
        }
    }, 30)
};

// 定义获取当前样式的函数
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }
};

// 添加类的函数
function addClass(obj, cn) {
    // 先判断是否含有该类
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
};

// 判断是否含有类
function hasClass(obj, cn) {
    // 使用构造函数创建正则表达式
    var reg = new RegExp("\\b" + cn + "\\b");
    // 判断是否含有cn
    return reg.test(obj.className);
};

// 移除一个类
function removeClass(obj, cn) {
    // 使用构造函数创建正则表达式
    var reg = new RegExp("\\b" + cn + "\\b");
    // 用空字符串替换已有的类
    obj.className = obj.className.replace(reg, "");
};

// toggleClass用来切换类，有则删，无则加
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
};