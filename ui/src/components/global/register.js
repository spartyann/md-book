import Vue from "vue";

import DeleteBtn from "./DeleteBtn.vue";
import CopyText from "./CopyText.vue";
import UpdatingIconItem from "./UpdatingIconItem.vue";
import DateTime from './DateTime';

export default {

	registerGlobalComponents()
	{
		Vue.component("DeleteBtn", DeleteBtn);
		Vue.component("CopyText", CopyText);
		Vue.component("UpdatingIconItem", UpdatingIconItem);
		Vue.component("DateTime", DateTime);

	}
}
