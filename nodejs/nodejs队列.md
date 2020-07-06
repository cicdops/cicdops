
## nodejs队列
创建具有指定并发性的队列对象。添加到队列的任务以并行方式处理(直到并发性限制)。如果所有的worker都在进行中，任务就会排队，直到有一个worker可用。worker完成任务后，将调用该任务的回调。  

priorityQueue对象，queue和priorityQueue对象有两个区别:  push(任务，优先级，[回调])-优先级应该是一个数字。如果给定了一组任务，则所有任务将被分配相同的优先级。没有unshift 。  

```
// create a queue object with concurrency 2
var q = async.queue(function(task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);

// assign a callback
q.drain(function() {
    console.log('all items have been processed');
});
// or await the end
// await q.drain()

// assign an error callback
q.error(function(err, task) {
    console.error('task experienced an error');
});

// add some items to the queue
q.push({name: 'foo'}, function(err) {
    console.log('finished processing foo');
});
// callback is optional
q.push({name: 'bar'});

// add some items to the queue (batch-wise)
q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
    console.log('finished processing item');
});

// add some items to the front of the queue
q.unshift({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});
//--------------------------
// create a queue object with concurrency 1
var q = async.priorityQueue(function(task, callback) {
  console.log('Hello ' + task.name);
  callback();
}, 1);

// assign a callback
q.drain = function() {
  console.log('All items have been processed');
};

// add some items to the queue with priority
q.push({name: 'foo3'}, 3, function(err) {
  console.log('Finished processing foo');
});

q.push({name: 'bar2'}, 2, function (err) {
  console.log('Finished processing bar');
});

// add some items to the queue (batch-wise) which will have same priority
q.push([{name: 'baz1'},{name: 'bay1'},{name: 'bax1'}], 1, function(err) {
  console.log('Finished processing item');
});
输出结果如下：
hello bar
finished processing bar
hello foo
finished processing foo
hello bar
hello baz
finished processing item
hello bay
finished processing item
hello bax
finished processing item
all items have been processed
Hello bay1
Finished processing item
Hello bax1
Finished processing item
Hello bar2
Finished processing bar
Hello foo3
Finished processing foo
```

参考：  
https://github.com/caolan/async/blob/v1.5.2/README.md  
https://medium.com/velotio-perspectives/understanding-node-js-async-flows-parallel-serial-waterfall-and-queues-6f9c4badbc17  
