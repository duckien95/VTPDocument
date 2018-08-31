import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DocumentService} from '../../../services/document-management/document.service';

const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuggestTitleComponent),
    multi: true
};

declare var $: any;

@Component({
  selector: 'app-suggest-title',
  templateUrl: './suggest-title.component.html',
  styleUrls: ['./suggest-title.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class SuggestTitleComponent implements AfterViewInit, OnChanges {

  constructor(
    private documentService: DocumentService
  ) { }

  // ngOnInit() {
  // }

    @Input('value') _value = [];

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private onFocusCallback: (_: any) => void = noop;

    @Input('options') options;
    @Input('data') data;
    @Input('title') title;
    isOpen: boolean;
    listData: any[] = [];
    @Input('defaultSelect') defaultSelect: any[] = [];
    @ViewChild('mySelectTitle') mySelect;
    @ViewChild('titleQueryInput') titleQueryInput;

    // @Output() onSelect = new EventEmitter<any>();
    // @Output() onRemove = new EventEmitter<any>();
    // @Output() manage = new EventEmitter<any>();

    str = '';
    keyFocus = 0;

    ShowData: any[] = [];


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
            // this.data = changes.data.currentValue;
            // this.listData = this.data;
        }
    }

    ngAfterViewInit() {
        // console.log('ngAfterViewInit', this.data);
    }

    choise(key) {
        return this.value.findIndex(x => x.value === key) === -1;
    }

    toggle() {
      console.log('toggle');
        this.isOpen = true;
        // this.searchTags();
        if  (this.isOpen) {
            this.titleQueryInput.nativeElement.focus();
            $(document).on('click', this.eventClick);
            $(document).on('keydown', this.eventFocus);
        } else {
            console.log('isOpen = false');
            $(document).off('click', this.eventClick);
            $(document).off('keydown', this.eventFocus);
        }
    }

    searchTitle(e?) {
      this.isOpen = true;
        console.log('search', e);
        if (e && [38, 40, 13].indexOf(e.keyCode) !== -1) {
          return true;
        }
        this.keyFocus = -1;
        setTimeout( _ =>{
          this.documentService.getTitleSuggest(this.str).subscribe( response => {
            console.log('title suggest',response);
            if(response.length){
              this.ShowData = response.map( item => {
                // console.log(item)
                return {
                  'text': item
                }
              });
            }
          })
        })

    }

    eventClick = (e) => {
        e.stopPropagation();
        console.log('event click title');
        if (!$(e.target).closest(this.mySelect.nativeElement).length) {

            this.isOpen = false;
            console.log('change status ok', this);
            $(document).off('click', this.eventClick);
            $(document).off('keydown', this.eventFocus);
            // $(e.target).off('click', this.eventClick);
            // $(e.target).off('keydown', this.eventFocus);


        }
        e.preventDefault();
        console.log('next event title');
    }

    eventFocus = e => {
        if (e.keyCode === 38) {
            if (this.keyFocus > 0) {
                this.keyFocus -= 1;
            } else {
                this.keyFocus = this.ShowData.length - 1;
            }
        } else if (e.keyCode === 40) {
            if (this.keyFocus < this.ShowData.length - 1) {
                this.keyFocus += 1;
            } else {
                this.keyFocus = 0;
            }
        } else if (e.keyCode === 13 && this.keyFocus !== -1) {
            console.log('focus title');
            this.changeTitle(e, this.ShowData[this.keyFocus]);
        }
    };

    changeTitle(event, item) {
      console.log('item = ', item);
        // event.stopPropagation();
        event.preventDefault()
        if(item !== undefined){
            this.value = item.text;
        }
        this.isOpen = false;
        this.ShowData = [];
        // this.onSelect.emit(item);
        this.str = '';
        // this.searchTitle();
        this.titleQueryInput.nativeElement.focus();
    }

    removeTitle(event, item) {
        event.stopPropagation();
        // event.preventDefault();
        console.log('remove in title');
        this.value = [];
        this.ShowData = [];
        // this.onRemove.emit(item);
        this.str = '';
        // this.searchTitle();
        this.titleQueryInput.nativeElement.focus();
    }



}
