import Vue from "vue";

import DeleteBtn from "./DeleteBtn.vue";
import CopyText from "./CopyText.vue";
import UpdatingIconItem from "./UpdatingIconItem.vue";
import DateTime from './DateTime';
import SmileyLevels from './SmileyLevels';
import Panel from './Panel';
import Rating from './Rating';
import RichText from './RichText';

export default {

	registerGlobalComponents()
	{
		Vue.component("DeleteBtn", DeleteBtn);
		Vue.component("CopyText", CopyText);
		Vue.component("UpdatingIconItem", UpdatingIconItem);
		Vue.component("DateTime", DateTime);
		Vue.component("SmileyLevels", SmileyLevels);
		Vue.component("Panel", Panel);
		Vue.component("Rating", Rating);
		Vue.component("RichText", RichText);
	}
}
