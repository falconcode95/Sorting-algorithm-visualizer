import './App.css';
import {useState, useEffect} from 'react';
import MaxHeap from './heapClass';

function App() {
  const [startArray, setStartArray] = useState();
  const [shouldUpdate, setShouldUpdate] = useState(false);
  let animationArray = [];
  let mergeSortArray = startArray;
  let tempElement;
  let eligibilityArray = [];
  const concatElements = (left, pivet, right)=>{
    const result = left.concat(pivet).concat(right);
    let array = localStorage.getItem('array').split(',');
    console.log(array);
    for(let i=0; i < array.length; i++){
      array[i] = parseInt(array[i])
    }
    const resultFirst = result[0];
    let arrayIndex;
    array.forEach((item , index)=> {
        if(item === resultFirst){
            arrayIndex = index
        }
    })
    for(let i=0; i < result.length; i++){
        for(let j=0; j < array.length; j++){
            if(result[i] === array[j]){
              array.splice(j, 1)
            }
        }
    }
    array.splice(arrayIndex, 0 , result);
    array = array.flat();
    animationArray.push(array)
    localStorage.setItem('array', mergeSortArray)
    return result;
  }
  const quickSort = givenArray => {
      if(givenArray.length < 2){
          return givenArray
      }
      const pivet = [givenArray[givenArray.length-1]];
      const leftSide = [];
      const rightSide = [];
      while(givenArray.length > 1){
          if(givenArray[0] < pivet){
              leftSide.push(givenArray.shift())
          } else {
              rightSide.push(givenArray.shift());
          }
      }

      return concatElements(quickSort(leftSide), quickSort(pivet), quickSort(rightSide));
  }
  const heapSort = array => {
      let sorted = [];
      const heap = new MaxHeap();
      for( let i=0; i < array.length; i++){
          heap.insert(array[i])
      }
      for( let j=0; j < array.length; j++){
          let element = heap.delete();
          let tempArray = []
          for(let i=0; i < array.length; i++){
              if(element === array[i]){
                  array.splice(i, 1)
              }
          }
          array.unshift(element)
          array.map(item => tempArray.push(item));
          animationArray.push(tempArray);
          sorted.unshift(element)
      }
      return sorted;
  }
  const checkEligibility = (randomNumber, array)=> {
      const isDuplicate = array ? array.some(item => item === randomNumber) : true;
      if(randomNumber !== 0 && !isDuplicate){
        return randomNumber;
      } 
      tempElement = Math.floor(Math.random() * 50);
      return checkEligibility(tempElement, eligibilityArray);
  }
  const updateArray = ()=> {
    for(let i=0; i < 49; i++){
      let randomNumber = Math.floor(Math.random() * 50);
      let clearedNumber = checkEligibility(randomNumber, eligibilityArray)
      eligibilityArray.push(clearedNumber);
    }
    setStartArray(eligibilityArray);
  }
  useEffect(()=> {
    updateArray();
  }, []);
  const SortArrays = (array1, array2)=> {
      const arr1 = array1;
      const arr2 = array2;
      const output = [];
      while(array1.length && array2.length){
          if(array1[0] < array2[0]){
              output.push(array1.shift())
          } else {
              output.push(array2.shift());
          }
      }
      const result = output.concat(array1.slice()).concat(array2.slice());
      const resultFirst = result[0];
      let arrayIndex;
      mergeSortArray.forEach((item , index)=> {
          if(item === resultFirst){
              arrayIndex = index
          }
      })
      for(let i=0; i < result.length; i++){
          for(let j=0; j < mergeSortArray.length; j++){
              if(result[i] === mergeSortArray[j]){
                mergeSortArray.splice(j, 1)
              }
          }
      }
      mergeSortArray.splice(0, 0 , result);
      // mergeSortArray = mergeSortArray.flat();
      animationArray.push(mergeSortArray.flat())
      // console.log(mergeSortArray, 'array');
      return result;
  }

  const mergeSort = array => {
      if(array.length <=1){
          return array
      }
      const middleIndex = Math.floor(array.length/2);
      const leftArray = array.slice(0, middleIndex);
      const rightArray = array.slice(middleIndex);
      return SortArrays( mergeSort(leftArray), mergeSort(rightArray));
  };
  const bubbleSort = array => {
    let iteration = true;
    let shouldContinue = false;
    let count = array.length-1;
    while(iteration){
        shouldContinue = false
        if(count > 0){
            for(let i=0; i < count; i++){
              shouldContinue = true;
              let tempArray = []
                if(array[i] > array[i+1]){
                  let smaller = array[i+1];
                  array[i+1] = array[i];
                  array[i] = smaller;                                 
                  }
                  array.map(item => tempArray.push(item));
                  animationArray.push(tempArray)
                }
        }
            count = count -1

            if(!shouldContinue){
                iteration = false
            }
    }
    return array
  }
  const sort = (e)=> {
    updateArray();
    // setShouldUpdate(true)
    localStorage.setItem('array', mergeSortArray);
    const arrayBars = document.getElementsByClassName('par');
    let sortType;
    sortType = e.target.getAttribute('data-id')
    let speed;
    if(sortType === 'merge'){
     mergeSort(startArray);
     speed = 200
    } else if(sortType === 'heap'){
       heapSort(startArray);
       speed = 150;
    } else if(sortType === 'quick'){
       quickSort(startArray);  
       speed = 250;
    } else if(sortType === 'bubble'){
       bubbleSort(startArray); 
       speed = 7;
    }
    for(let i=0; i < animationArray.length; i++){
      setTimeout(()=> {
        for(let j=0; j < arrayBars.length; j++){
          arrayBars[j].style.height = `${animationArray[i][j]}vh`;
      }
      }, i * speed)
    }
  }

  return (
    <div className="App">
      <nav>
        <h1 onClick={sort} data-id="bubble">BUBBLE SORT</h1>
        <h1 onClick={sort} data-id="heap">HEAP SORT</h1>
        <h1 onClick={sort} data-id="quick">QUICK SORT</h1>
        <h1 onClick={sort} data-id="merge">MERGE SORT</h1>
      </nav>
      <div>
        <div className='container'>
          {startArray && startArray.map((item, index)=>{
            return <div style={{height: `${item}vh`}} className="par" key={index}></div>
          })
          }
        </div>
        <button onClick={updateArray}>Generate New Array</button>
      </div>
    </div>
  );
}

export default App;

