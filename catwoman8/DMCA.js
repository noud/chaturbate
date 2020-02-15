// https://ar.chaturbate.com/apps/user_uploads/0/catwoman8/
// https://ar.chaturbate.com/apps/sourcecode/dmca/?version=&slot=0

function hideWatermark(theID)
{
    var element = document.getElementById(theID);
    element.style.backgroundImage = 'none';
    element.style.backgroundColor = 'white';
}
function showWatermark(theID)
{
    var element = document.getElementById(theID);
    if (element.value.length == 0)
        element.style.backgroundImage = 'url(\'https://www.google.com/imgres?imgurl=http://images.dmca.com/Badges/DMCA_badge_grn_100w.png&imgrefurl=http://www.dmca.com/&h=101&w=100&tbnid=IcwhUexZXD-x-M:&docid=O4BcIrDyonR0JM&ei=Vy-bVr7RFszmmAHSjpCIDw&tbm=isch&ved=0ahUKEwj-2Pv4lrDKAhVMMyYKHVIHBPEQMwg1KAMwAw\')';
    else
        element.style.backgroundColor = 'white';
}
