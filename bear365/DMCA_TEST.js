// https://ar.chaturbate.com/apps/user_uploads/0/bear365/
// https://ar.chaturbate.com/apps/sourcecode/dmca-test/?version=&slot=0

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
        element.style.backgroundImage = 'url(\'http://images.dmca.com/Badges/dmca_protected_sml_120d.png?ID=6e7af6ce-0f9c-4ddc-a10a-68fed70abcc4\')';
    else
        element.style.backgroundColor = 'white';
}
