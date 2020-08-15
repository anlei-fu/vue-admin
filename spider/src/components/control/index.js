import CreateButton from "./CreateButton";
import QueryButton from "./QueryButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

import BatchEditButton from "./BatchEditButton";
import BatchDeleteButton from "./BatchDeleteButton";
import ExportExcelButton from "./ExportExcelButton";
import ImportExcelButton from "./ImportExcelButton";


import PlainText from "./PlainText";
import Link from "./Link";

import MyTable from "./MyTable";

import MyModal from "./MyModal";

import MySelect from "./MySelect";
import MyRadioGroup from "./MyRadioGroup";
import MyCheckBoxGroup from "./MyCheckBoxGroup";
import PageSetting from "./PageSetting";
import MyPager from "./MyPager";
import MyDateRange from "./MyDateRange";
import MyDateTime from "./MyDateTime";

import MyScroll from "./MyScroll";
import MyFileUploader from "./MyFileUploader";
import MyColorPicker from "./MyColorPicker";
import MyPositiveProgress from "./MyPositiveProgress";
import MyNegativeProgress from "./MyNegativeProgress";
import MyPageSettingButton from "./MyPageSettingButton";
import MyFilter from "./MyFilter";

import Footer from "./Footer";



export default{
        install(vue){
                vue.component("CreateButton",CreateButton);
                vue.component("DeleteButton",DeleteButton);
                vue.component("EditButton",EditButton);
                vue.component("QueryButton",QueryButton);
                vue.component("ExportExcelButton",ExportExcelButton);
                vue.component("ImportExcelButton",ImportExcelButton);

                vue.component("BatchEditButton",BatchEditButton);
                vue.component("BatchDeleteButton",BatchDeleteButton);
               
               
                vue.component("PlainText",PlainText);
                vue.component("Link",Link);
                vue.component("MyTable",MyTable);
                vue.component("MyModal",MyModal);
                vue.component("MySelect",MySelect);
                vue.component("MyRadioGroup",MyRadioGroup);
                vue.component("MyCheckBoxGroup",MyCheckBoxGroup);
               
                vue.component("MyDateRange",MyDateRange);
                vue.component("Footer",Footer);
                vue.component("PageSetting",PageSetting);
                vue.component("MyPager",MyPager);
                vue.component("MyScroll",MyScroll);
                vue.component("MyDateTime",MyDateTime);
                vue.component("MyFileUploader",MyFileUploader);
                vue.component("MyColorPicker",MyColorPicker);
                vue.component("MyPositiveProgress",MyPositiveProgress);
                vue.component("MyNegativeProgress",MyNegativeProgress);
                vue.component("MyPageSettingButton",MyPageSettingButton);
                vue.component("MyFilter",MyFilter);
        }
}