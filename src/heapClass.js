class MaxHeap {

    constructor(){
        this.heap = []
    }

    print(){
        return this.heap
    }

    parantIndex(index){
        return Math.floor((index-1)/2)
    }

    leftChildIndex(index){
        return index * 2 + 1
    }

    rightChildIndex(index){
        return index * 2 + 2
    }

    swap(a,b){
        let temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp
    }

    insert(item){
        this.heap.push(item);
        let index = this.heap.length-1;
        let parentIndex = this.parantIndex(index);
        while(this.heap[index] > this.heap[parentIndex]){
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = this.parantIndex(index);
        }
    }

    delete (){
        let item = this.heap.shift();
        this.heap.unshift(this.heap.pop());
        let index = 0;
        let leftChildIndex = this.leftChildIndex(index);
        let rightChildIndex = this.rightChildIndex(index);
        while(this.heap[leftChildIndex] && this.heap[leftChildIndex] > this.heap[index] || this.heap[rightChildIndex] > this.heap[index]){
            let max = leftChildIndex;
            if(this.heap[rightChildIndex] && this.heap[rightChildIndex] > this.heap[max]){
                max = rightChildIndex
            }
            this.swap(index, max);
            index = max;
            leftChildIndex = this.leftChildIndex(index);
            rightChildIndex = this.rightChildIndex(index);
        }

        return item;
    }
}

export default MaxHeap;