## getting started
The design spaces panel provides a tabbed interface that looks by default like this:

![](http://mmiworks.net/metapolator/startspace.png)

from the top:

The **local menu** contains these items:

* New
* Duplicate
* -- <separator> --
* Delete…

**notes**:

* Duplicate not only duplicates the current design space tab, it also duplicates its instances in the instances list;
* Delete ot only removes the current design space tab, it also removes its instances from the instances list.

The **tabs** can be renamed by double clicking on their label, and resorted. Always at the right (for L–to–R locales) there is a ‘New tab’ tab. The tabs do not have close boxes ([X]), because it a way to heavy action (lose all instances that live on this tab) to be causally offered. Tabs will need an overflow mechanism for when there are too many to show at once. We expect quite a few tabs because they are for serious projects a way to break down complexity for users.

The space is not configured, so its background is still ‘chrome’ and it prompts a **choice of space**:

![](http://mmiworks.net/metapolator/spacechoice.png)

Exploration is not compatible with Control. Exploration is a flat-earth, limited view of metapolation reality, Control can set and show any possible combination. Thus **a choice must be made**, by clicking either on the big link or the illustration. **shortcut**: drop one or more master (sequences) on the big link or illustration to make the choice _and_ initialise the space with the dropped items.

Once the choice is made the tab transitions (suggestion: dissolve) to the empty state for that type:

![](http://mmiworks.net/metapolator/explorempty.png)

We see the background is now of the content type and that an icon representing the type of design space has been inserted in the tab. This helps identifying multiple tabs:

![](http://mmiworks.net/metapolator/tabicons2.png)

## exploration space
Action start when masters get added to the exploration space. Adding one master is not _that_ interesting:

![](http://mmiworks.net/metapolator/explore1master.png)

The single master dominates the whole space. **rule**: master can be placed anywhere in the space.

It is identified by the first character of its name in the master list (if that was the default ‘Master 1’ then it is called ‘M1’ here). We do not want a visual space full of writing. Clicking (and/or holding) the master in the space identifies it in the master list by highlighting it exclusively (for the duration that the mouse is down).

What is interesting, **rule**: when the first master (sequence) is added to the space, also a first instance is created for the space in the instances list, selected there and shown by means of the cursor.

The plot thickens when a second master is added:

![](http://mmiworks.net/metapolator/explore2masters.png)

Since at the position where a master is located it is the undisputed ruler of the design space (100% defines the metapolation result) all other masters must have zero strength at that point. Ergo: masters limit the reach of other masters.

**rule**: when the reach of a master is (effectively) limited by one other master, its reach (aka field) is circular.<br/>
**rule**: the fields of the masters ramp down from 100% strength at the centre, to 0% at its edge.<br/>
**rule**: in the mix zone (here: between C and F) the metapolation mix is simply the ratio of the field strengths.<br/>
**rule**: when a master is grabbed with the mouse and dragged around, the fields of it and and other masters are continuously updated until the master is released in its new position.<br/>
**rule**: when the master configuration of a space is changed, the metapolation mix of the instances does not change and they ‘tag along’ in space the best they can.

and then we add a third master and their representation matures:

![](http://mmiworks.net/metapolator/explore3masters.png)

_more tomorrow…_

### colors
The colours I use in my examples are 100% saturated, 100% brightness colours at 20% opacity. The hue is generated by dividing the 360° hue coordinate by 20 (no repeats for the first 20 objects): 18° hue increments.

Now start at hue = 0° for the first object and increment 72° for each next one, until back at 0°;<br/>
now start at hue = 36° for the first object and increment 72 ° for each next one, until back at 36°;<br/>
now start at hue = 18° for the first object and increment 72 ° for each next one, until back at 18°;<br/>
now start at hue = 54° for the first object and increment 72 ° for each next one, until back at 54°;<br/>
then start from the top.

_yes, this has been tested for 8 types of color-blindness, with Sim Daltonism.app_