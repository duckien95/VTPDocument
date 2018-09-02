import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuggestTagComponent),
    multi: true
};

declare var $: any;

@Component({
  selector: 'app-suggest-tag',
  templateUrl: './suggest-tag.component.html',
  styleUrls: ['./suggest-tag.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class SuggestTagComponent implements AfterViewInit, OnChanges {

  constructor() { }

  // ngOnInit() {
  // }

    @Input('value') _value = [];

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private onFocusCallback: (_: any) => void = noop;

    // @Input('options') options;
    @Input('data') data;
    isOpen: boolean;
    listData: any[] = [];
    // @Input('defaultSelect') defaultSelect: any[] = [];

    @ViewChild('mySelectTag') mySelectTag;
    @ViewChild('tagQueryInput') tagQueryInput;

    // @Output() onSelect = new EventEmitter<any>();
    // @Output() onRemove = new EventEmitter<any>();
    // @Output() manage = new EventEmitter<any>();

    str = '';
    keyFocus = 0;

    ShowData: any[] = [];

    searchTags(e?) {
        console.log('search');
        if (e && [38, 40, 13].indexOf(e.keyCode) !== -1) {
          return;
        }
        this.keyFocus = -1;
        this.ShowData = this.listData.filter(x => {
            if (!this.choise(x.value)) {
                return false;
            }
            if (x.text.indexOf(this.str) !== -1) {
                return true;
            }
            return false;
        });
    }

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
      console.log('changes in tag suggest')
        if (changes && changes.data && changes.data.currentValue) {
            this.data = changes.data.currentValue;
            this.listData = this.data;
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
        this.searchTags();
        if (this.isOpen) {
            this.tagQueryInput.nativeElement.focus();
            $(document).on('click', this.eventClick);
            $(document).on('keydown', this.eventFocus);
        } else {
            console.log('isOpen = false');
            $(document).off('click', this.eventClick);
            $(document).off('keydown', this.eventFocus);
        }
    }

    eventClick = (e) => {
      e.stopPropagation();

        // console.log($(e.target).closest(this.mySelect.nativeElement).length);
        if (!$(e.target).closest(this.mySelectTag.nativeElement).length && this.isOpen) {
             // this.tagQueryInput.nativeElement.focus();
              this.isOpen = false;
            // console.log('change status ok', this);
            $(document).off('click', this.eventClick);
            // $(document).off('click', e.target);
            $(document).off('keydown', this.eventFocus);
        }
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
            // e.stopPropagation();
            e.preventDefault();
            this.changeValue(e, this.ShowData[this.keyFocus]);
        }
    };

    changeValue(e, item) {
          e.preventDefault();
        let index = this.value.indexOf(item);
        if (index === -1) {
          console.log(item);
            this.value = [ ...this.value, item];
            console.log(this.value);
        }
        // this.isOpen = false;
        this.str = '';
        // this.searchTags();
        this.tagQueryInput.nativeElement.focus();
    }

    removeItem(event, item) {
        event.stopPropagation();
        // event.preventDefault();
        console.log('remove in tag')
        this.value = this.value.filter(x => x.value !== item.value);
        // this.onRemove.emit(item);
        this.str = '';
        // this.searchTags();
        // this.tagQueryInput.nativeElement.focus();
    }



}
