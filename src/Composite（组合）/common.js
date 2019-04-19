//扫描文件夹：文件夹和文件之间的关系，非常适合用组合模式来描述。文件夹里既可以包含文件，又可以包含其他文件夹，最终可能组合成一棵树。

    //Folder类
    var Folder = function (name) {
        this.name = name;
        this.files = [];
    };
    Folder.prototype.add = function (file) {
        this.files.push(file);
    };
    Folder.prototype.scan = function () {
        console.log('开始扫描文件夹：' + this.name);
        for (var i = 0, file; file = this.files[i++];) {
            file.scan();
        };
    };

    //File类
    var File = function (name) {
        this.name = name;
    };
    File.prototype.add = function () {
        throw new Error('文件下面不能再添加文件');
    };
    File.prototype.scan = function () {
        console.log('开始扫描文件：' + this.name);
    };

    //创建3个文件夹
    var folder = new Folder('学习资料');
    var folder1 = new Folder('JavaScript');
    var folder2 = new Folder('JQuery');

    //创建3个文件
    var file1 = new File('JavaScript设计模式与开发实践');
    var file2 = new File('锋利的JQuery');
    var file3 = new File('编程人生');

    //把文件添加到文件夹或文件夹添加到另一文件夹中
    folder1.add(file1);
    folder2.add(file2);

    folder.add(folder1);
    folder.add(folder2);
    folder.add(file3);

    //扫描文件夹
    folder.scan();