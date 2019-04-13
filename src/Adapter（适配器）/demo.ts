//假定现在项目已经在用一个画图接口Graph以及它的实现Canvas2D：
interface Graph{
    drawLine();

    drawPie();
}

class Canvas2D implements Graph{
    drawLine(){
        console.log('draw 2d line');
    }

    drawPie(){
        console.log('draw 2d pie');
    }
}

//项目升级需要提高UI美观，引入3D画图库Canvas3D，两者接口不一样：
class Canvas3D{
    draw3DLine(){
        console.log('draw 3d line');
    }

    draw3DPie(){
        console.log('draw 3d pie');
    }
}

//项目是依赖接口Graph的，如果要直接加上3d功能就需要改接口，这个代价比较大，这时适配器派上用场：
class Canvas3DAdapter implements Graph{
    private canvas3D: Canvas3D = new Canvas3D();

    drawLine(){
        this.canvas3D.draw3DLine();
    }

    drawPie(){
        this.canvas3D.draw3DPie();
    }
}

let canvas2D: Graph = new Canvas2D();
canvas2D.drawLine();
canvas2D.drawPie();

let canvas3D: Graph = new Canvas3DAdapter();
canvas3D.drawLine();
canvas3D.drawPie();

//输出
// draw 2d line
// draw 2d pie
// draw 3d line
// draw 3d pie

//这样，使用时用Canvas3DAdapter就可以了，项目还是只依赖Graph这个接口就可以画出3D图。