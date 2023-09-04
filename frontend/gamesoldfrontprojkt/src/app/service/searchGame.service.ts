
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class SearchGameService {
    private valueToBeSearched: HTMLInputElement = document.createElement('input');
    @Output() userTriggerSearchEvent = new EventEmitter<string>();

    constructor(){
    }

    setValueToBeSearched(valueReceivedToBeSearched: HTMLInputElement){
        this.valueToBeSearched = valueReceivedToBeSearched;
        this.emitUserTriggerSearchEvent(this.valueToBeSearched.value);
    }



    getValueToBeSearch(): HTMLInputElement{
        return this.valueToBeSearched;
    }

    emitUserTriggerSearchEvent(nameToBeSearched: string){
        this.userTriggerSearchEvent.emit(nameToBeSearched);
    }
    
}


