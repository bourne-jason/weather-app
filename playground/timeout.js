console.log('Starting app');

var object = {
    name : 'Aritra',
    callback(obj){
        console.log(obj);        
    }
};

object.age = 25;

console.log(object);
setTimeout(() => {object.callback(object)}, 2000);

console.log('Finishing App');