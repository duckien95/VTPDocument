import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DocumentService} from '../../../services/document-management/document.service';

const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeViewComponent),
    multi: true
};

declare var $: any;

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class TreeViewComponent implements AfterViewInit, OnChanges {

  constructor(
    private documentService: DocumentService
  ) { }

  // ngOnInit() {
  // }

    @Input('value') _value = [];

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private onFocusCallback: (_: any) => void = noop;

    @Input('treeData') treeData;
    @Input('title') title;

    // @Output() onSelect = new EventEmitter<any>();
    // @Output() onRemove = new EventEmitter<any>();
    // @Output() manage = new EventEmitter<any>();


  // get accessor
    get value(): any {
        return this._value || [];
    }

    // set accessor including call the onchange callback
    set value(v: any) {
        this._value = v;
        this.onChangeCallback(v);
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.value) {
            this.value = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.data && changes.data.currentValue) {
            this.treeData = changes.data.currentValue;
        }
    }

    ngAfterViewInit() {
        // console.log('ngAfterViewInit', this.data);
    }

    changeValue(event, isChecked, value){
      // console.log(event.target);
      if(isChecked){
        this.value = value;

        $('input:checkbox').attr('checked', false);
        $(event.target).prop('checked', true);
      } else this.value =  null;



    }



}
