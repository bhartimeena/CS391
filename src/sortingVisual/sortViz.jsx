import React from "react";
import './sortViz.css';
import {Slider} from "@material-ui/core";

export default class SortingVisualizer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            dummyArray: [],

            arraySet: [],
            currentStep: 0,
            colorCmp: [],

            count: 15,
            delay: 100,

            comparisons: 0,
            swapping: 0,
            greener: 0,

            description: '',
            animeInterval: 0,

            toggleNext: true,
            togglePrev: true,
            togglePP: true,
            toggleSort: false,
            toggleNewArr: false,

            toggleSliderCount: false,
            toggleSliderDelay: false,

        };
    }

    componentDidMount() {
        this.resetArray();
    }

    /*
        checker(){
            const checkHelper = document.getElementsByClassName('array-bar');
            checkHelper[4].style.backgroundColor = 'yellow';
        }
    */

    resetArray() {
        clearInterval(this.state.animeInterval);
        let array = [];
        for (let i = 0; i < this.state.count; i++) {
            array.push(Math.floor(Math.random() * (200 - 50) + 5));
        }
        let arrayBars1 = document.getElementsByClassName('array-bar');
        for (let m = 0; m < arrayBars1.length; m++) {
            arrayBars1[m].style.backgroundColor = 'red';
        }


        this.setState({
            array: array,

            arraySet: [],
            colorCmp: [],
            currentStep: 0,

            comparisons: 0,
            swapping: 0,
            greener: 0,

            toggleNext: true,
            togglePrev: true,
            togglePP: true,
            toggleSort: false,
            toggleNewArr: false,

            toggleSliderCount: false,
            toggleSliderDelay: false,
        });
        let arrayBars = document.getElementsByClassName('array-bar');
        for (let m = 0; m < arrayBars.length; m++) {
            arrayBars[m].style.backgroundColor = 'red';
        }


    }

    Merge() {

        function mergeSort(array) {
            console.log("Splitting: ", array)

            if (array.length > 1) {
                let middle = Math.ceil(array.length / 2);
                let leftArr = array.slice(0, middle);
                let rightArr = array.slice(middle, array.length);

                mergeSort(leftArr);
                mergeSort(rightArr);

                let l = 0, r = 0, i = 0;

                while (l < leftArr.length && r < rightArr.length) {
                    if (leftArr[l] < rightArr[r]) {
                        array[i] = leftArr[l];
                        i++;
                        l++;
                    } else {
                        array[i] = rightArr[r];
                        i++;
                        r++;
                    }
                }
                while (l < leftArr.length) {
                    array[i] = leftArr[l];
                    i++;
                    l++;
                }
                while (r < rightArr.length) {
                    array[i] = rightArr[r];
                    i++;
                    r++;
                }
                console.log("Merging:   ", array)
            }

        }

        this.setState({
            swapping: 0,
            comparisons: 0,
        });

        let arr = this.state.array;
        let arrayBars = document.getElementsByClassName('array-bar');

        mergeSort(arr);

    }


    Bubble() {
        this.setState({

            currentStep: 0,

            comparisons: 0,
            swapping: 0,
            greener: 0,

            toggleSort: true,
            toggleNewArr: false,
            toggleNext: true,
            togglePP: false,
            togglePrev: true,

            toggleSliderCount: true,
            toggleSliderDelay: true,

            /* firstPrev: true*/
        });

        let temp = 0;
        const arr = this.state.array.slice();
        const arraySet = [], colorCmp = [];
        let arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {

                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    this.setState({swapping: this.state.swapping + 1});
                }
                arraySet.push(arr.slice());
                colorCmp.push([j, j + 1].slice());
            }
            arraySet.push(arrayBars.length - 1 - i);
            colorCmp.push([0].slice());
        }

        this.setState({
            arraySet: arraySet,
            colorCmp: colorCmp
        })

        this.state.animeInterval = setInterval(() => {
            this.BubbleColor();
            this.setState({currentStep: this.state.currentStep + 1})
        }, this.state.delay);
    }

    BubbleColor() {
        let arrayBars = document.getElementsByClassName('array-bar');
        for (let m = 0; m < arrayBars.length - this.state.greener; m++) {
            arrayBars[m].style.backgroundColor = 'red';
        }
        const [fBar, sBar] = this.state.colorCmp[this.state.currentStep];
        if (this.state.colorCmp[this.state.currentStep].length === 2) {
            arrayBars[fBar].style.backgroundColor = 'yellow';
            arrayBars[sBar].style.backgroundColor = 'yellow';
        }

        if (this.state.arraySet[this.state.currentStep].length === this.state.count) {
            this.setState({
                array: this.state.arraySet[this.state.currentStep],
                comparisons: this.state.comparisons + 1
            });
        } else {
            arrayBars[this.state.arraySet[this.state.currentStep]].style.backgroundColor = 'green';
            this.setState({greener: this.state.greener + 1});
        }
        if (this.state.currentStep === this.state.arraySet.length - 1) {
            arrayBars[0].style.backgroundColor = 'green';
            this.setState({
                toggleNewArr: false,
                toggleSort: false,
                toggleNext: true,
                togglePP: true,
                togglePrev: false,
            })
            clearInterval(this.state.animeInterval);
        }
    }

    Next() {
        this.setState({

            currentStep: this.state.currentStep + 1,

            toggleSort: true,
            toggleNewArr: false,
            toggleNext: false,
            togglePP: false,
            togglePrev: true,

            toggleSliderCount: true,
            toggleSliderDelay: true,
        });

        this.BubbleColor();
    }

    playPause() {
        clearInterval(this.state.animeInterval);

        this.setState({
            togglePrev: false,
            toggleNext: false
        })
        let arrayBars = document.getElementsByClassName('array-bar');
        for (let m = 0; m < arrayBars.length - this.state.greener; m++) {
            arrayBars[m].style.backgroundColor = 'red';
        }
        const [fBar, sBar] = this.state.colorCmp[this.state.currentStep - 1];
        if (this.state.colorCmp[this.state.currentStep].length === 2) {
            arrayBars[fBar].style.backgroundColor = 'yellow';
            arrayBars[sBar].style.backgroundColor = 'yellow';
        }
        for (let m = arrayBars.length - 1; m >= arrayBars.length - this.state.greener; m--) {
            arrayBars[m].style.backgroundColor = 'green';
        }


    }

    Prev() {
        if (this.state.currentStep === 0) {
            this.setState({
                togglePrev: false
            })
        } else {
            /*if (this.state.firstPrev){
                this.setState({
                    currentStep: this.state.currentStep - 1,
                    firstPrev: false
                })

            }*/
            this.setState({
                currentStep: this.state.currentStep - 1
            })
            this.BubbleColor()
        }

    }

    render() {
        const delayer = (e, val) => {
            console.warn(val)
            this.setState({
                delay: val
            })
        }
        const sizer = (e, val) => {
            console.warn(val)
            this.setState({
                count: val
            })
            this.resetArray()
        }
        return (
            <div>
                <h3>Number of Elements in the Array:</h3>
                <h1> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.count}</h1>
                <Slider
                    aria-label="Number of Elements"
                    defaultValue={this.state.count}
                    max={100}
                    min={10}
                    step={1}
                    onChange={sizer}
                    valueLabelDisplay={true}
                    aria-setsize={10}
                    disabled={this.state.toggleSliderCount}
                />
                <h3>Delay of Transitions:</h3>
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.delay}ms</h1>
                <Slider
                    aria-label="Delay"
                    defaultValue={this.state.delay}
                    max={500}
                    min={1}
                    step={1}
                    onChange={delayer}
                    valueLabelDisplay={true}
                    disabled={this.state.toggleSliderDelay}
                />
                <h3> {
                    this.state.array.map((value, index) =>
                        <div className="array-bar" key={index} style={{height: `${value * 3}px`}}>{value}</div>
                    )
                }</h3>
                <button className='multiBtn' onClick={() => this.resetArray()}
                        disabled={this.state.toggleNewArr}>Generate New Array
                </button>
                <button className='multiBtn' onClick={() => this.Bubble()} disabled={this.state.toggleSort}>Bubble
                    Sort
                </button>
                <button className='multiBtn' onClick={() => this.Merge()} disabled={this.state.toggleSort}>Merge Sort
                </button>
                <button className='multiBtn' onClick={() => this.Prev()} id='firstBtn'
                        disabled={this.state.togglePrev}>(Previous)
                </button>
                <button className='multiBtn' onClick={() => this.playPause()} disabled={this.state.togglePP}>PLaY /
                    PAuSe
                </button>
                <button className='multiBtn' onClick={() => this.Next()} disabled={this.state.toggleNext}>(Next)
                </button>
                {/*<button onClick={() => this.checker()}*/}
                <h1>Comparisons: {this.state.comparisons}   </h1>
                <h1>Swapping: {this.state.swapping}</h1>

            </div>
        );
    }
}

