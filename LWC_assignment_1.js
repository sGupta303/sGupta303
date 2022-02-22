import { LightningElement,track ,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getopportunity from '@salesforce/apex/ProcessOpportunities.getopportunity';
import deleteopportunity from '@salesforce/apex/ProcessOpportunities.deleteopportunity';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LWC_Assignment_1 extends NavigationMixin(LightningElement) {
    @track functionRecords = [];
    @track oppId;
    @track isModelopen=false;
    @wire(getopportunity)objectinfo;
    
    viewFormDetails(event){
        this.oppId = event.currentTarget.dataset.id;
        console.log(this.oppId);
        this. isModelopen=true;
    }
    newOpportunity(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'new'
            }
        });
    }
    refreshPage(){
        return refreshApex(this.objectinfo);
    }
    closeModal(){
        this. isModelopen=false;  
    }
    handleSubmit(event) {
        this.isModelopen=false; 
        console.log('onsubmit event recordEditForm'+ event.detail.fields);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Opportunity Record Edited Successfully',
                variant: 'success',
            }),
        );
    }
    deleteOpp(event){
        let index = event.currentTarget.dataset.id; 
        console.log(index);
        deleteopportunity({opptId:index})
    .then(notification => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Opportunity Record Deleted Successfully',
                variant: 'success',
            }),
        );
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error Deleting record',
                message: error.body.message,
                variant: 'error',
            }),
        );
    });
    }
   
}
