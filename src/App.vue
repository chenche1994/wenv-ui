<template>
  <div id="app">
    <WTable
      style="max-height:300px;width:100%;"
      class="table-test"
      :columns="t3Columns"
      :data="t3Data"
      :remote-sort="true"
      :multiple-sort="false"
      :sort-by="t3sortby"
      @on-row-click="log"
      @on-sort-change="onTableSortChange"
      @on-selection-change="onTableSelectionChange"
    >
      <template #test1="slotProps">
        <WDatePicker
          v-model="dateStart"
          type="time"
          :end="dateEnd"
          :disabled-date="disabledDate"
          @input="log(dateStart)"
        />
        <!-- <button @click.stop="log('test')">
          {{ slotProps.row.name }}
        </button> -->
        <!-- <select class="vxe-default-select">
          <option value="" />
          <option value="1">
            男
          </option>
          <option value="0">
            女
          </option>
        </select> -->
      </template>
    </WTable>
    <!-- <WTable
      style="max-height:300px;width:500px;"
      class="table-test"
      :columns="t3Columns"
      :data="[]"
      :remote-sort="false"
    /> -->
    <input v-model="treeo02query" style="margin-top:10px;">
    <div style="width:200px;margin:10px;">
      <WSelectTree03
        v-model="tree3Select1"
        :options="tree3Array1"
        :clearable="true"
        :multiple="false"
        placeholder="没有数据时的提示"
        @on-select-change="s03Select"
      />
    </div>
    <div style="width:200px;margin:10px;">
      <WSelectTree03
        v-model="tree3SelectMStr1"
        :options="tree3Array2"
        :multiple="true"
        :limit="3"
        placeholder="没有数据时的提示"
        @on-select-change="s03Select"
      />
    </div>
    <div>
      <Tabs01 v-model="tab03active" :tabs="tabs03" style="width: 100%;">
        <div>
          ssssssssssssssssssssssssss
        </div>
      </Tabs01>
    </div>
    <div>
      <Tabs01 v-model="tab03active" :tabs="tabs03" style="width: 100%;" type="02">
        <div>
          ssssssssssssssssssssssssss
        </div>
      </Tabs01>
    </div>
    <div class="tree-02">
      <WTree02
        v-model="tree3Select2"
        type="dropdown"
        :nodes="tree3Array3"
        :icons="t3icons"
        :query="treeo02query"
        @on-select-change="tree02Select"
      />
    </div>
    <div class="tree-02">
      <WTree02
        v-model="tree3Select3"
        type="default"
        :nodes="tree3Array4"
        :icons="t3icons"
        @on-select-change="tree02Select"
      />
    </div>
    <div class="tree-02">
      <WTree02
        v-model="tree3SelectMStr2"
        type="default"
        :nodes="tree3Array5"
        :multiple="true"
        :icons="t3icons"
        :cascade="false"
        :limit="3"
        @on-select-change="tree02Select"
      />
    </div>
    <div>
      <WSelect02Single
        v-model="selected02singlelist"
        :clearable="true"
        :options="optionsList"
        :normalize="{ name: 'test' }"
        placeholder="placeholder test"
        style="width:100px;margin-right:2px;"
        :disabled="true"
        @on-change="search"
      />
      <WSelect02Single
        v-model="selected02singlelist"
        :clearable="true"
        :options="optionsList"
        :normalize="{ name: 'test' }"
        placeholder="placeholder test"
        style="width:100px;margin-right:2px;"
        :disabled="false"
        @on-change="search"
      />
      <WSelect02Single
        v-model="selected02singletree"
        type="tree"
        :clearable="true"
        :options="optionsTree"
        :normalize="{ name: 'label' }"
        placeholder="placeholder test"
        style="width:200px;margin-right:2px;"
        :disabled="true"
        @on-change="search"
      />
      <WSelect02Single
        v-model="selected02singletree"
        type="tree"
        :clearable="true"
        :options="optionsTree"
        :normalize="{ name: 'label' }"
        placeholder="placeholder test"
        style="width:200px;margin-right:2px;"
        :disabled="false"
        @on-change="search"
      />
      <WSelect02Multiple
        v-model="selected02multiplelist"
        :options="optionsList"
        :limit="3"
        :normalize="{ name: 'test' }"
        placeholder="placeholder test"
        style="width:100px;margin-right:2px;"
        :disabled="false"
        @on-change="search"
      />
      <WSelect02Multiple
        v-model="selected02multiplelist"
        :options="optionsList"
        :limit="3"
        :normalize="{ name: 'test' }"
        placeholder="placeholder test"
        style="width:200px;margin-right:2px;"
        :disabled="true"
        @on-change="search"
      />
      <WSelect02Multiple
        v-model="selected02multipletree"
        type="tree"
        :limit="3"
        :options="optionsTree"
        :normalize="{ name: 'label' }"
        placeholder="placeholder test"
        style="width:100px;margin-right:2px;"
        :disabled="false"
        @on-change="search"
      />
      <WSelect02Multiple
        v-model="selected02multipletree"
        type="tree"
        :limit="3"
        :options="optionsTree"
        :normalize="{ name: 'label' }"
        placeholder="placeholder test"
        style="width:200px;margin-right:2px;"
        :disabled="true"
        @on-change="search"
      />
    </div>
    <div>
      <Banner03
        :logo="navbarLogoIcon"
        title="河道水生态管理系统"
        :systems="systems"
        @on-logout="log"
      />
    </div>
    <div>
      <SideMenu
        v-model="selectedMenuName"
        style="height:600px;max-height:600px;margin-bottom:50px;"
        :menus="menus"
        @click="log"
      />
      <WButton
        name="查询"
        @on-click="
          collapsed = !collapsed;
          changePage();
        "
      />
    </div>
    <div class="baseline">
      <!-- <WTable01 class="wtable" :columns="columns4" :data="tableData" @on-row-click="rowSelect">
        <template #test2="slotProps">
          <button>{{ slotProps.row.test2 }}</button>
        </template>
      </WTable01> -->
      <!-- <WTable
        class="wtable"
        :columns="columns4"
        :data="tableData"
        @on-row-click="rowSelect"
      >
        <template slot="test2" slot-scope="{ row }">
          <button>{{ row.test2 }}</button>
        </template>
      </WTable> -->
      <div class="wtree">
        <WTree
          :node="treeJson2"
          :multi-select="true"
          :normalize="treeNormalize"
          @on-check-change="log"
          @on-select-change="log"
        />
      </div>
      <div class="wtree">
        <WTree
          :node="treeJson3"
          :multi-select="true"
          :cascade="false"
          :normalize="treeNormalize"
          @on-check-change="log"
          @on-select-change="log"
        />
      </div>
      <div class="wtree">
        <WTree
          :node="treeJson4"
          :multi-select="true"
          :cascade="false"
          :icons="wtreeIcons"
          :normalize="treeNormalize"
          @on-check-change="log"
          @on-select-change="log"
        />
      </div>
      <div class="wtree">
        <WTree
          style="width:200px;"
          :node="treeJson5"
          :normalize="treeNormalize"
          @on-check-change="log"
          @on-select-change="log"
        />
      </div>
      <WRadio
        v-model="radioValue"
        :value="'金星'"
        :label="'金星'"
        icon="icon-arrow-right"
        style="margin-right:2px;"
        @on-select="log"
      />
      <WRadio
        v-model="radioValue"
        :value="'木星'"
        :label="'木星2'"
        style="margin-right:2px;"
        @on-select="log"
      />
      <WCheckbox
        v-model="checked4"
        style="margin-right:2px;"
        label="环境专题"
        icon="wenv-i-tuichu"
        @on-change="log('WCheckbox on change')"
      />
      <WCheckbox
        v-model="checked4"
        style="margin-right:2px;"
        label="环境专题"
        @on-change="log('WCheckbox on change')"
      />
      <WButton name="查询" icon="wenv-i-tuichu" style="margin-right:2px;" type="success" />
      <WButton name="查询" style="margin-right:2px;" />
      <WInputSearch
        v-model="inputText"
        placeholder="环境专题"
        style="width:100px;margin-right:2px;"
        @on-search="log('WInputSearch on search:' + inputText)"
      />
      <WInputSearch
        v-model="inputText"
        placeholder="环境专题"
        type="primary"
        style="width:100px;margin-right:2px;"
        @on-search="log('WInputSearch on search:' + inputText)"
      />
      <WInputSearch
        v-model="inputText"
        placeholder="环境专题"
        style="width:300px;margin-right:2px;"
        @on-search="log('WInputSearch on search:' + inputText)"
      />
      <WInputNumber
        v-model="inputNumber"
        placeholder="环境专题"
        :disabled="true"
        style="width:100px;"
      />
      <WInputNumber
        v-model="inputNumber"
        placeholder="环境专题"
        :readonly="true"
        style="width:100px;"
      />
      <WInputNumber
        v-model="inputNumber"
        placeholder="环境专题0.1"
        style="width:100px;"
        :min="10"
        :max="20"
        :step="0.0001"
        :fixed="5"
        @input="log"
      />
      <WInput
        v-model="inputText"
        placeholder="winput环境专题"
        :disabled="true"
        style="width:100px;"
      />
      <WInput v-model="inputText" placeholder="winput环境专题" style="width:100px;" />
      <WPage v-model="wpageOption" @on-change="log" />
    </div>
    <div class="buttons">
      <WButton name="查询" />
      <WButton name="查询" icon="wenv-i-tuichu" />
      <WButton name="查询" type="default" />
      <w-button name="查询11" type="primary" />
      <WButton name="查询" type="success" />
      <WButton name="返回列表" type="light" />
      <WButton icon="wenv-i-tuichu" type="success" />
      <WButton name="查询" type="error" @on-click="log" />
      <WButton
        name="上传附件"
        icon="wenv-i-tuichu"
        type="success"
        :disabled="true"
        @on-click="log"
      />
      <WButton name="上传附件" type="success" :disabled="true" @on-click="log" />
      <WButton name="上传附件" type="success" @on-click="log" />
      <WRadio
        v-model="radioValue"
        :value="'金星'"
        :label="'金星'"
        icon="wenv-i-tuichu"
        :disabled="true"
        @on-select="log"
      />
      <WCheckbox
        v-model="checked4"
        style="margin-left:10px;"
        label="环境专题"
        @on-change="log('WCheckbox on change')"
      />
      <WRadio
        v-model="radioValue"
        :icon="'layer'"
        :value="'木星'"
        :disbaled="true"
        @on-select="log"
      />
      <WRadio v-model="radioValue" :value="'水星'" @on-select="log" />
      <WRadio v-model="radioValue" :value="'火星'" @on-select="log" />
      <WRadio v-model="radioValue" :value="'土星'" @on-select="log" />
    </div>
    <div class="navbar" style="width:300px;">
      <VirtualScrollList :item-height="78" :data="sites" class="panel-scroll">
        <template v-slot="{ item }">
          <div style="background-color:lightblue;height:78px;">
            {{ item.name }}
          </div>
        </template>
      </VirtualScrollList>
    </div>
    <div>
      <!-- <Table4
        class="navbar"
        :columns="columns4"
        :data="tableData"
        :multi-select="true"
        :width="400"
        :max-height="200"
        @on-row-click="rowSelect"
      >
        <template slot="test2" slot-scope="{ row }">
          <button>{{ row.test2 }}</button>
        </template>
      </Table4> -->
    </div>
    <div>
      <WSvg name="水质渲染" />
      <WSvg name="水质渲染" :scale="0.5" />
      <WSvg name="水质渲染" :scale="2" />
    </div>
    <div class="container-a">
      <PanelSlideRight2 :title="'图例'" style="height:80px;">
        <div>asdasdasdasdasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </PanelSlideRight2>
    </div>
    <div class="container-a">
      <PanelSlideRight2 :title="'图例'" style="height:80px;">
        <div>aa</div>
        <div>aa</div>
        <div>aa</div>
      </PanelSlideRight2>
    </div>
    <div class="navbar radios">
      <WRadio v-model="radioValue" :value="'金星'" :label="'jinxing'" @on-select="log" />
      <WRadio v-model="radioValue" :value="'木星'" @on-select="log" />
      <WRadio v-model="radioValue" :value="'水星'" @on-select="log" />
      <WRadio v-model="radioValue" :value="'火星'" @on-select="log" />
      <WRadio v-model="radioValue" :value="'土星'" @on-select="log" />
    </div>
    <div class="navbar">
      <SideMenu2 class="sidemenu" :menus="menus2" :width="150" />
    </div>
    <div class="navbar" style="width:300px;">
      <Tabs2
        :keep-alive="true"
        :tabs="tabs"
        :head-class="'tabs2-head'"
        :content-class="'tabs2-content-class'"
        style="height:400px;"
      />
    </div>
    <div class="navbar" style="width:300px;">
      <Button :name="'bbbbb'" :width="100" :height="50" @on-click="isModal2Open = !isModal2Open" />
      <Button
        :disabled="true"
        :name="'bbbbb'"
        :width="100"
        :height="50"
        @on-click="isModal2Open = !isModal2Open"
      />
      <WModalFull v-model="isModal2Open">
        <div class="modal2">
          ssssssssssssss
        </div>
      </WModalFull>
    </div>
    <div class="navbar" style="width:300px;">
      <PanelScroll :item-height="78" :data="sites" class="panel-scroll">
        <template v-slot:item="{ item }">
          <div style="background-color:lightblue;height:78px;">
            {{ item.name }}
          </div>
        </template>
      </PanelScroll>
    </div>
    <div class="navbar">
      <WImageUploader :limit="3" accept=".jpg" :images="images" @on-delete="log" @on-add="log" />
    </div>
    <div class="navbar">
      <ButtonGroup2 :buttons="buttons2" />
    </div>
    <div class="navbar">
      <PanelSlideDown v-model="isPanelOpen1" class="panel-slide-right">
        <template v-slot:header>
          <span>Here might be</span>
          <span>Here </span>
        </template>
        <template v-slot:content>
          <div>ssssss</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
          <div>dddddd</div>
        </template>
      </PanelSlideDown>
    </div>
    <div class="navbar">
      <PanelSlideDown v-model="isPanelOpen2" :icon="'layer'" :name="'#222  植物地块'" />
    </div>
    <div class="navbar">
      <Page :total="pageTotal" @on-change="log" @on-page-size-change="log" />
      <Button name="change-total" @on-click="pageTotal = 5" />
    </div>
    <div class="navbar">
      <Button :name="'aaaa'" :width="100" :height="50" @on-click="isModalOpen = !isModalOpen" />
      <WModal v-model="isModalOpen" type="error" :title="'动物识别记录'">
        <Imagebox :images="images2" class="imagebox" />
      </WModal>
    </div>
    <div class="navbar">
      <PanelSlideLeft2 :content-width="356" :height="400">
        <Tabs2 :tabs="tabs" />
      </PanelSlideLeft2>
    </div>
    <div class="navbar">
      <Navbar :logo="navbarLogoIcon">
        <NavbarButton :icon="'环境专题'" :name="'环境专题'" />
        <NavbarButton :icon="'功能区'" :name="'功能区划分'" />
        <NavbarButton :icon="'鸟类'" :name="'鸟类'" />
        <NavbarButton :icon="'植物'" :name="'植物'" />
        <NavbarButton :icon="'巡查养护'" :name="'巡查养护'" />
        <NavbarToggleButton v-model="isToggled" :icon="'安全防护'" :name="'安全防护'" />
      </Navbar>
    </div>
    <div class="framework">
      <div class="content">
        <Banner :title="'环境监测管理系统'" :username="'管理员'" @on-logout="changeSelectedMenu" />
        <div>sssss</div>
      </div>
    </div>
    <div class="navbar">
      <WeekPicker v-model="week" @input="log" />
    </div>
    <Button :name="'aaaa'" :width="100" :height="50" :disabled="true" @on-click="log" />
    <Button :name="'aaaa'" :width="100" :height="50" @on-click="log" />
    <ButtonGroup :buttons="buttons" />
    <Checkbox2
      v-model="checked"
      style="margin-left:10px;"
      :name="'环境专题'"
      :icon="checkboxIcon"
      @change="log('WCheckbox on change')"
    />
    <WCheckbox
      v-model="checked1"
      style="margin-left:10px;"
      icon="wenv-i-tuichu"
      label="环境专题"
      :disabled="true"
      @on-change="log('WCheckbox on change')"
    />
    <WCheckbox
      v-model="checked2"
      style="margin-left:10px;"
      icon="wenv-i-tuichu"
      label="环境专题"
      :disabled="true"
      @on-change="log('WCheckbox on change')"
    />
    <WCheckbox
      v-model="checked2"
      style="margin-left:10px;"
      icon="wenv-i-tuichu"
      label="环境专题"
      @on-change="log('WCheckbox on change')"
    />
    <WCheckbox
      v-model="checked3"
      style="margin-left:10px;"
      label="环境专题"
      :disabled="true"
      @on-change="log('WCheckbox on change')"
    />
    <WCheckbox
      v-model="checked4"
      style="margin-left:10px;"
      label="环境专题"
      :disabled="true"
      @on-change="log('WCheckbox on change')"
    />
    <WCheckbox
      v-model="checked4"
      style="margin-left:10px;"
      label="环境专题"
      @on-change="log('WCheckbox on change')"
    />
    <WCheckbox
      v-model="checked4"
      style="margin-left:10px;"
      label="环境专题"
      :disabled="true"
      :indeterminate="true"
      @on-change="log('WCheckbox on change')"
    />
    <WCheckbox
      v-model="checked4"
      style="margin-left:10px;"
      label="环境专题"
      :disabled="true"
      :indeterminate="true"
      @on-change="log('WCheckbox on change')"
    />
    <WCheckbox
      v-model="checked4"
      style="margin-left:10px;"
      label="环境专题"
      :indeterminate="true"
      @on-change="log('WCheckbox on change')"
    />
    <div class="c">
      <FeatureLabel :type="'视频'" :name="'测试的摄像头'" :color="'gray'" />
      <FeatureLabel :type="'视频'" :name="''" :color="'gray'" style="margin-left:10px;" />
    </div>
    <WInput v-model="inputText" :placeholder="'winput'" style="marginLeft:10px;width:300px;" />
    <WInput
      v-model="inputText"
      :placeholder="'winput'"
      style="marginLeft:10px;width:300px;"
      :disabled="true"
    />
    <div style="margin-left:30px;">
      <WInputSearch
        v-model="inputText"
        :placeholder="'fffffff'"
        style="width:150px;"
        type="primary"
        @on-search="log('WInputSearch on search')"
      />
      <WInputSearch
        v-model="inputText"
        :placeholder="'fffffff'"
        style="width:150px;"
        @on-search="log('WInputSearch on search')"
      />
    </div>
    <div style="margin:200px;">
      <WPanel :title="'这是面板名称'" type="error" :buttons="panelButtons" @on-close="log">
        <div style="padding:200px;">
          ssss ssssss
          <div>
            sddd
          </div>
          <div>
            sddd
          </div>
          <div>
            sddd
          </div>
        </div>
      </WPanel>
      <WPanel :title="'test'" :buttons="panelButtons" style="marginLeft:90px;">
        <div style="padding:200px;">
          ssss ssssss
          <div>
            sddd
          </div>
          <div>
            sddd
          </div>
          <div>
            sddd
          </div>
        </div>
      </WPanel>
    </div>
    <div>
      <Toolbar>
        <ToolbarButton :icon="'layer'" :name="'图层'" />
        <ToolbarSplit />
        <ToolbarButton :icon="'layer'" :name="'图层'" />
        <ToolbarSplit />
        <ToolbarToggleButton v-model="isToggled" :icon="'layer'" :name="'图层'" @on-click="log" />
        <ToolbarSplit />
        <ToolbarDropdownButton :icon="'layer'" :name="'图层'" />
      </Toolbar>
    </div>
    <div>
      <PanelSlideRight :title="'图例'" :height="120" :content-width="250">
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
      </PanelSlideRight>
    </div>
    <div style="margin-left:20px;">
      <PanelSlideLeft :content-width="400" :height="500">
        <!-- <WDatePicker v-model="date" type="year" @input="log(date)" /> -->
        <!-- <WDatePicker v-model="date" type="month" @input="log(date)" /> -->
        <!-- <WDatePicker v-model="dateStart" type="day" :end="dateEnd" /> -->
        <!-- <WDatePicker v-model="dateStart" type="time" :end="dateEnd" /> -->
        <WDatePicker
          v-model="dateStart"
          type="time"
          :end="dateEnd"
          :disabled-date="disabledDate"
          @input="log(dateStart)"
        />
        <WDatePicker v-model="dateEnd" type="time" :start="dateStart" @input="log(dateEnd)" />
      </PanelSlideLeft>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import WTree from './components/tree/WTree.vue';
import WCheckbox from './components/checkbox/WCheckbox.vue';
import Checkbox2 from './components/Checkbox2.vue';
import Button from './components/Button.vue';
import WButton from './components/buttons/WButton.vue';
import ButtonTest from '../tests/fixtures/Button.vue';
import ButtonTest2 from '../tests/fixtures/Button.1.vue';
import ButtonGroup from './components/ButtonGroup.vue';
import WInput from './components/input/WInput.vue';
import WInputNumber from './components/input/WInputNumber.vue';
import WInputSearch from './components/input/WInputSearch.vue';
import WPanel from './components/panels/WPanel.vue';
// import Table4 from './components/Table4.vue';
// import WTable01 from './components/table/WTable01.vue';
import PanelSlideRight from './components/PanelSlideRight.vue';
import PanelSlideRight2 from './components/PanelSlideRight2.vue';
import PanelSlideLeft from './components/PanelSlideLeft.vue';
import PanelSlideLeft2 from './components/PanelSlideLeft2.vue';
import FeatureLabel from './components/FeatureLabel.vue';
// import TreeSelect from './components/TreeSelect.vue';
import Toolbar from './components/toolbar/Toolbar.vue';
import ToolbarButton from './components/toolbar/ToolbarButton.vue';
import ToolbarSplit from './components/toolbar/ToolbarSplit.vue';
import ToolbarToggleButton from './components/toolbar/ToolbarToggleButton.vue';
import ToolbarDropdownButton from './components/toolbar/ToolbarDropdownButton.vue';
import WDatePicker from './components/datepicker/WDatePicker.vue';
import WeekPicker from './components/date/WeekPicker.vue';
import SideMenu from './components/menu/SideMenu03.vue';
import SideMenu2 from './components/menu/SideMenu2.vue';
import Tabs2 from './components/Tabs2.vue';
import Tabs01 from './components/tabs/Tabs01.vue';
import Page from './components/Page.vue';
import WPage from './components/page/WPage.vue';
import Navbar from './components/menu/Navbar.vue';
import NavbarButton from './components/menu/NavbarButton.vue';
import NavbarToggleButton from './components/menu/NavbarToggleButton.vue';
import Banner from './components/Banner.vue';
import WModal from './components/modals/WModal.vue';
import WModalFull from './components/modals/WModalFull.vue';
import ButtonGroup2 from './components/ButtonGroup2.vue';
import PanelSlideDown from './components/PanelSlideDown.vue';
import WImageUploader from './components/WImageUploader.vue';
import PanelScroll from './components/PanelScroll.vue';
import WRadio from './components/radio/WRadio.vue';
import WSvg from './components/svg/WSvg.vue';
import VirtualScrollList from './components/VirtualScrollList.vue';
import Imagebox from './components/imagebox/Imagebox.vue';
import mockRegions from '../tests/fixtures/regions.json';
import deleteIcon from './assets/images/panel_delete.png';
import checkboxIcon from './assets/images/date_picker_calendar.png';
import avatarIcon from './assets/images/baner_avatar.png';
import mockSites from '../tests/fixtures/airSites.js';
import treeJson from '../tests/fixtures/tree.json';
import treeJson2 from '../tests/fixtures/tree2.json';
import Chrysanthemum from '../tests/fixtures/Chrysanthemum.jpg';
import Desert from '../tests/fixtures/Desert.jpg';
import sidemenuLogoIcon from '../tests/fixtures/sidemenu_logo.png';
import navbarLogoIcon from '../tests/fixtures/navbar_logo.png';
import Banner03 from './components/banners/Banner03.vue';
import WSelect02Single from './components/select/WSelect02Single.vue';
import WSelectTree03 from './components/select/WSelectTree03.vue';
import WSelect02Multiple from './components/select/WSelect02Multiple.vue';
import optionsTree from '../tests/fixtures/options-tree.js';
import optionsList from '../tests/fixtures/options-list.js';
import images from '../tests/fixtures/images.js';
import tree3 from '../tests/fixtures/tree3.js';
import WTree02 from './components/tree/WTree02.vue';
import tabsJson from '../tests/fixtures/tabs.json';
// import createHeader from './components/table02/createHeader.js';
// import createColgroup from './components/table02/createColgroup.js';
import t3Columns from '../tests/fixtures/columns.js';
import t3Data from '../tests/fixtures/table-data.js';
import WTable from './components/table05/WTable.vue';

// const aa = createHeader(columns);
// console.log(aa);
// const bb = createColgroup(columns, 100);
// console.log(bb);
export default {
  name: 'App',
  components: {
    WTree02,
    WTree,
    WRadio,
    Checkbox2,
    WCheckbox,
    WInput,
    WInputNumber,
    WInputSearch,
    WPanel,
    Toolbar,
    ToolbarButton,
    ToolbarSplit,
    ToolbarToggleButton,
    ToolbarDropdownButton,
    PanelSlideRight,
    PanelSlideRight2,
    PanelSlideLeft,
    FeatureLabel,
    // Table4,
    // WTable01,
    WTable,
    Button,
    WButton,
    ButtonGroup,
    WDatePicker,
    SideMenu,
    SideMenu2,
    Banner,
    Navbar,
    NavbarButton,
    NavbarToggleButton,
    Tabs2,
    PanelSlideLeft2,
    ButtonGroup2,
    WModal,
    Page,
    WPage,
    PanelSlideDown,
    WImageUploader,
    PanelScroll,
    WModalFull,
    WSvg,
    WeekPicker,
    VirtualScrollList,
    Imagebox,
    Banner03,
    WSelect02Single,
    WSelect02Multiple,
    Tabs01,
    WSelectTree03,
  },
  data() {
    setTimeout(() => {
      this.inputNumber = 16;
      this.tab03active = '大数据看板2';

      this.tabs03 = tabsJson.data;
      // this.tab03active = '大数据看板2';
    }, 5000);

    // let index = 0;
    // setInterval(() => {
    //   this.tab03active = this.tabs03[index].id;
    //   index += 1;
    //   if (index >= this.tabs03.length) {
    //     index = 0;
    //   }
    // }, 1000);
    const tree3Array1 = tree3();
    const tree3Array2 = tree3();
    const tree3Array3 = tree3();
    const tree3Array4 = tree3();
    const tree3Array5 = tree3();
    return {
      t3Columns,
      t3Data,
      t3sortby: { name: 'desc' },
      disabledDate: ['2019-12-03', '2019-12-16'],
      treeo02query: '',
      tab03active: '',
      tabs03: [],
      dateStart: '2019-11-20',
      dateEnd: '2019-12-30',
      wpageOption: {
        current: 10,
        pageSize: 20,
        total: 0,
      },
      t3icons: {
        toggle: 'wenv-i-youjiantou1',
        fold: 'wenv-i-rili',
        unfold: 'wenv-i-shijian1',
        endpoint: 'wenv-i-tuichu',
      },
      tree3Select1: 'root-3-0-2-0',
      tree3Select2: 'root-3-0-2-0',
      tree3Select3: 'root-3-0-2-0',
      tree3SelectMStr1: ['root-3-0-2-0', 'root-3-1-2-0-1-0'],
      tree3SelectMStr2: ['root-3-0-2-0', 'root-3-1-2-0-1-0'],
      tree3Array1,
      tree3Array2,
      tree3Array3,
      tree3Array4,
      tree3Array5,
      currentPage: 10,
      systems: [
        { icon: 'wenv-i-tuichu', name: '属于该用户仓库的', url: 'http://www.baidu.com' },
        { icon: 'wenv-i-tuichu', name: '属于库的', url: 'http://www.baidu.com' },
        { icon: 'wenv-i-tuichu', name: '属于该用', url: 'http://www.baidu.com' },
      ],
      selected02singlelist: 5,
      selected02singletree: '5_0_2',
      selected02multiplelist: [1],
      selected02multipletree: [0, 1, '5_0_3', '4_2_3'],
      selected02list: [],
      optionsTree: optionsTree(),
      optionsList: optionsList(),
      collapsed: true,
      wtreeIcons: {
        toggle: 'wenv-i-youjiantou1',
        fold: 'wenv-i-rili',
        unfold: 'wenv-i-shijian1',
        endpoint: 'wenv-i-tuichu',
      },
      deleteIcon,
      images3: [],
      images2: [Chrysanthemum, Desert],
      pageTotal: 100000,
      treeJson,
      treeJson2: {},
      treeJson3: {},
      treeJson4: {},
      treeJson5: {},
      treeJson6: {},
      treeNormalize: {
        label: 'name',
        children: 'child',
      },
      radioValue: '金星',
      avatarIcon,
      images,
      sites: mockSites().data,
      isPanelOpen1: false,
      isPanelOpen2: true,
      isModalOpen: false,
      isModal2Open: false,
      checked: true,
      checked1: true,
      checked2: false,
      checked3: true,
      checked4: false,
      inputText: '19年第43周',
      inputNumber: 12,
      isToggled: false,
      checkboxIcon,
      sidemenuLogoIcon,
      navbarLogoIcon,
      date: '2019-02-21 12:30:11',
      date2: new Date(),
      date3: '2019-07-03',
      month: '2019-02',
      datetime: '2019-02-21 12:30:11',
      year: '2019',
      week: '2019年第43周',
      regions: mockRegions.data,
      regionNormalize: {
        children: 'child',
      },
      options: [
        { code: 1, value: 'aa' },
        { code: 2, value: 'bb' },
        { code: 3, value: 'cc' },
      ],
      selected1: { id: 2, name: 'bb' },
      selected2: 2,
      selected3: '',
      selectedRegion: {},
      selectedRegion2: {
        name: '\u5408\u80a5\u5e02',
        id: '2c93a2b2612cba4a01614a17e8110069',
      },
      selectedRegion3: {
        name: '\u5408\u80a5\u5e02',
        id: '2c93a2b2612cba4a01614a17e8110069',
      },
      panelButtons: [
        {
          icon: 'wenv-i-tuichu',
          click() {
            console.log('on edit click');
          },
        },
        {
          icon: 'wenv-i-tuichu',
          click() {
            console.log('on delete click');
          },
        },
      ],
      columns: [
        {
          title: '断面\n名称\n(mg/L)',
          key: 'test1',
          width: '80px',
          converter(value) {
            return `${value}cccc`;
          },
        },
        {
          title: 'test2',
          width: '180px',
          slot: 'test2',
        },
        {
          title: 'test3',
          width: '380px',
          key: 'test3',
        },
        {
          title: 'test4',
          // width: '80px',
          minWidth: '180px',
          key: 'test4',
        },
      ],
      columns4: [
        {
          type: 'selection',
          width: 50,
          fixed: 'left',
        },
        {
          title: '断面名称(mg/L)',
          key: 'test1',
          width: 180,
          sort: 'test1',
          sortKey: 'test4',
          sortType: 'asc',
          converter(value) {
            return `${value}cccc`;
          },
        },
        {
          title: 'test2',
          width: 81,
          resize: true,
          slot: 'test2',
          sort: 'test2',
        },
        {
          title: 'test3',
          width: 182,
          // resize: true,
          key: 'test3',
          sortKey: 'test3.value',
          sortType: 'asc',
          fixed: 'right',
          converter(value) {
            return value.value;
          },
        },
        {
          title: 'test4',
          width: 182,
          resize: true,
          tip: true,
          key: 'test4',
          sortKey: 'test4',
          sortType: 'asc',
        },
      ],
      tableData: [],
      buttons: [
        {
          name: 'aaa',
          click: () => {
            console.log('aaa');
          },
          isToggled: true,
        },
        {
          name: 'bbb',
          click: () => {
            console.log('bbb');
          },
        },
        {
          name: 'ccc',
          click: () => {
            console.log('ccc');
          },
        },
        {
          name: 'ddd',
          click: () => {
            console.log('ddd');
          },
        },
        {
          name: 'eee',
          click: () => {
            console.log('eee');
          },
        },
      ],
      selectedMenuName: '报警查询',
      menus: [
        {
          icon: 'wenv-i-tuichu',
          id: '1',
          label: '实时监测',
          onClick(id) {
            console.log(`${id} on click`);
          },
        },
        {
          icon: 'wenv-i-tuichu',
          id: '2',
          label: '数据管理',
          children: [],
          onClick(id) {
            console.log(`${id} on click`);
          },
        },
        {
          icon: 'wenv-i-tuichu',
          id: '3',
          label: '报警管理',
          children: [
            {
              id: '3-1',
              label: '报警查询',
              children: [
                {
                  id: '3-1-1',
                  label: '报警查询3',
                  hidden: true,
                  onClick(id) {
                    console.log(`${id} on click`);
                  },
                },
                {
                  id: '3-1-2',
                  label: '报警统计3',
                  onClick(id) {
                    console.log(`${id} on click`);
                  },
                },
              ],
            },
            {
              id: '3-2',
              label: '报警统计',
              onClick(id) {
                console.log(`${id} on click`);
              },
            },
          ],
        },
        {
          icon: 'wenv-i-shijian1',
          id: '4',
          label: '统计分析',
          children: [
            {
              id: '4-1',
              label: '报警查询',
              onClick(id) {
                console.log(`${id} on click`);
              },
            },
            {
              id: '4-2',
              label: '报警统计',
              onClick(id) {
                console.log(`${id} on click`);
              },
            },
          ],
        },
      ],
      menus2: [
        {
          name: '实时监测',
          onClick(id) {
            console.log(`${id} on click`);
          },
        },
        {
          icon: 'sidemenu_baojingguanli',
          name: '数据管理',
          isSelected: true,
          children: [],
          onClick(id) {
            console.log(`${id} on click`);
          },
        },
        {
          icon: 'sidemenu_baojingguanli',
          name: '报警管理',
          children: [
            {
              name: '报警查询',
              onClick(id) {
                console.log(`${id} on click`);
              },
            },
            {
              name: '报警统计',
              onClick(id) {
                console.log(`${id} on click`);
              },
            },
          ],
        },
        {
          icon: 'sidemenu_baojingguanli',
          name: '统计分析',
          isSelected: false,
          children: [
            {
              name: '报警查询',
              onClick(id) {
                console.log(`${id} on click`);
              },
            },
            {
              name: '报警统计',
              onClick(id) {
                console.log(`${id} on click`);
              },
            },
          ],
        },
      ],
      tabs: [
        { name: '水质', width: 112, component: ButtonTest },
        { name: '空气质量', width: 112, component: ButtonTest2 },
        // { name: '土壤', width: 112, component: ButtonTest2 },
      ],
      buttons2: [
        {
          icon: '水质渲染',
          name: '水质渲染',
          onClick(isToggled) {
            console.log(isToggled);
          },
        },
        {
          icon: '水质渲染',
          name: '水质渲染',
          onClick() {},
        },
        {
          icon: '水质渲染',
          name: '水质渲染',
          onClick() {},
        },
        {
          icon: '水质渲染',
          name: '水质渲染',
          onClick() {},
        },
      ],
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.$loading.show();

    //   setTimeout(() => {
    //     this.$loading.hide();
    //   }, 10000);
    // }, 10000);

    // const el = document.getElementById('test');
    // el.innerHTML = chs(columns, 28, 'left');
    // const el2 = document.getElementById('test2');
    // this.t = new Table(el2, {
    //   columns,
    //   data: tableData,
    //   headLineHeight: 28,
    //   rowLineHeight: 28,
    //   remoteSort: false,
    //   multipleSort: false,
    //   sortBy: {},
    //   scrollHandlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    //   wheelPropagation: false,
    //   noDataText: '没有数据!',
    // });

    const data = [
      {
        test1: 'bbbeeeeeerrrrrrrrrrrr',
        test2: '111111111111111111111111111111',
        test3: {
          value: 1,
        },
        test4: '1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2',
      },
      {
        test1:
          '五四运动以来的100年，是中国青年一代又一代接续奋斗、凯歌前行的100年，是中国青年用青春之我创造青春之中国、青春之民族的100年。',
        test2: '222222',
        test3: {
          value:
            '五四运动以来的100年，是中国青年一代又一代接续奋斗、凯歌前行的100年，是中国青年用青春之我创造青春之中国、青春之民族的100年。',
        },
        test4:
          '五四运动以来的100年，是中国青年一代又一代接续奋斗、凯歌前行的100年，是中国青年用青春之我创造青春之中国、青春之民族的100年。',
      },
      {
        test1: '看',
        test2: '111111',
        test3: {
          value: 2,
        },
        test4: 'aaaa',
      },
      {
        test1: 'aaa',
        test2: '222222',
        test3: {
          value: 4,
        },
        test4: 'bbbbb',
      },
      {
        test1: 'bbbeeeeeerrrrrrrrrrrr',
        test2: '111111',
        test3: {
          value: 5,
        },
        test4: 'aaaa',
      },
      {
        test1: 'aaa',
        test2: '222222',
        test3: {
          value: 6,
        },
        test4: 'bbbbb',
      },
    ];
    this.tableData = data;
    this.treeJson2 = cloneDeep(treeJson2);
    this.treeJson3 = cloneDeep(treeJson2);
    this.treeJson4 = cloneDeep(treeJson2);
    this.treeJson5 = cloneDeep(treeJson2);
    this.treeJson6 = cloneDeep(treeJson2);
  },
  methods: {
    onTableSortChange() {
      console.log(this.t3sortby);
      this.t3Data = [];
      setTimeout(() => {
        this.t3Data = t3Data;
      }, 2000);
    },
    onTableSelectionChange() {
      console.log(this.t3Data);
    },
    log(msg) {
      console.log(msg);
    },
    logDate2(msg) {
      console.log(msg);
    },
    search(v) {
      console.log(`search:  ${v}-${v.name}`);
    },
    rowSelect(row) {
      console.log(row);
    },
    changeSelectedMenu() {
      this.selectedMenuName = '报警统计';
    },
    tree02Select(a) {
      console.log(a);
    },
    tree02Check(a) {
      console.log(a);
    },
    changePage() {
      setTimeout(() => {
        this.wpageOption = {
          current: 200,
          pageSize: 100,
          total: 10000,
        };
      }, 2000);
    },
    s03Select(v) {
      console.log(v);
    },
  },
};
</script>

<style lang="less">
@import './main.less';

body {
  font-family: @font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background-color: #62ee2b;
}

// #app > * {
//   margin-top: 10px;
// }

body {
  margin: 0px;
  padding: 0;
}

.c {
  display: flex;
  align-items: center;
  justify-content: center;
}

input::placeholder {
  font-family: 'Microsoft YaHei';
}

.table {
  height: 400px;
  width: 100%;
  font-size: 14px;
}

.framework {
  display: flex;

  .sidemenu {
    height: 300px;
    z-index: 999999;
    border: 1px solid #cccccc;
  }
  .content {
    display: flex;
    flex-flow: column;
    // width: 100%;
    flex: 1;
  }
}

.navbar {
  margin: 10px;
  // background-color: lightgreen;
}

.panel-slide-right {
  border-bottom: 1px solid #cccccc;
}

.tabs2-head {
  // background-color: yellow!important;
  // border-radius: 4px 4px 0px 0px!important;
  height: 30px !important;
}

.panel-scroll {
  height: 200px;
}

.modal2 {
  width: 200px;
  height: 300px;
  border-radius: 4px;
  background-color: white;
}

.tabs2-content-class {
  height: 100%;
}

.radios {
  display: flex;
  align-items: center;
}
.container-a {
  width: 1200px;
  display: flex;
  justify-content: flex-end;
}

.imagebox {
  height: 400px;
  width: 400px;
}

.buttons {
  & > * {
    margin: 20px;
  }
}

.baseline {
  margin: 10px 10px;
  // border: 1px solid black;
  // display: flex;
  // align-items: center;
}

.wtree {
  width: 250px;
  display: inline-block;
  vertical-align: top;
}

.wtable {
  // width: 500px;
  max-height: 158px;
}

.tree-02 {
  display: inline-block;
  overflow: auto;
  width: 200px;
  height: 600px;
}

.table-test {
  margin: 10px 10px;
}
</style>
