
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

/* This class is responsible for dealing with the searching by product name mechanism on nav-component and acts as a "middle-man" between the components
Nav and ProductList  */

@Injectable({
    providedIn: 'root'
})
export class SearchGameService {
    /* new EventEmitter that will trigger when the NavComponent searches for a value */
    @Output() userTriggerSearchEvent = new EventEmitter<string>();

    constructor(){
    }
    
    /* Method receives the HtmlInputElement , then calls the emitUserTriggerSearchEvent with the value within */
    setValueToBeSearched(valueReceivedToBeSearched: HTMLInputElement){
        this.emitUserTriggerSearchEvent(valueReceivedToBeSearched.value);
    }

    /* Emits a new event after being called by the method setValueToBeSearched for listeners */
    emitUserTriggerSearchEvent(nameToBeSearched: string){
        this.userTriggerSearchEvent.emit(nameToBeSearched);
    }
    
}


