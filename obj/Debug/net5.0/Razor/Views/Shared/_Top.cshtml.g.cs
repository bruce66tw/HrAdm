#pragma checksum "D:\_project2\HrAdm\Views\Shared\_Top.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7bd720c265ab64a680ac4912098b4cde088b8c58"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__Top), @"mvc.1.0.view", @"/Views/Shared/_Top.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\_project2\HrAdm\Views\_ViewImports.cshtml"
using Base.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\_project2\HrAdm\Views\_ViewImports.cshtml"
using Base.Services;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "D:\_project2\HrAdm\Views\_ViewImports.cshtml"
using BaseWeb.Services;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "D:\_project2\HrAdm\Views\_ViewImports.cshtml"
using BaseWeb.ViewComponents;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "D:\_project2\HrAdm\Views\_ViewImports.cshtml"
using HrAdm;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "D:\_project2\HrAdm\Views\_ViewImports.cshtml"
using HrAdm.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7bd720c265ab64a680ac4912098b4cde088b8c58", @"/Views/Shared/_Top.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"be7a03adbc135a5ad0dbd462e2a9a9d3b2496f71", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__Top : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "D:\_project2\HrAdm\Views\Shared\_Top.cshtml"
  
    /*
    var locales = new List<IdStrDto>()
    {
        //Id need map to locale !!
        new IdStrDto(){ Id = "zh-TW", Str = "Taiwan" },
        new IdStrDto(){ Id = "en-US", Str = "English" },
        new IdStrDto(){ Id = "zh-CN", Str = "China" },
    };
    */

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<style>
    #_Top {
        color: #EAFFFF;
        background: #28C2FE;
        height: 45px;
    }

    #_Top li {
        margin: auto 5px;
    }
    #_Top i {
        font-size: 20px;
    }
</style>

<nav id=""_Top"" class=""navbar navbar-expand navbar-dark"">
    <a class=""sidebar-toggle text-light mr-3"" onclick=""_leftmenu.onToggleMenu(); return false;"" style=""cursor:pointer"">
        <!--<i class=""fa fa-bars""></i>-->
        <span class=""navbar-toggler-icon""></span>
    </a>

    <a class=""navbar-brand"" href=""#""><i class=""fa fa-code-branch""></i>");
#nullable restore
#line 35 "D:\_project2\HrAdm\Views\Shared\_Top.cshtml"
                                                                 Write(_Fun.Config.SystemName);

#line default
#line hidden
#nullable disable
            WriteLiteral("</a>\r\n\r\n    <div class=\"navbar-collapse collapse\">\r\n        <ul class=\"navbar-nav ml-auto\">\r\n");
            WriteLiteral("\r\n            <li>\r\n                <a class=\"nav-link\"");
            BeginWriteAttribute("href", " href=\"", 1289, "\"", 1324, 1);
#nullable restore
#line 46 "D:\_project2\HrAdm\Views\Shared\_Top.cshtml"
WriteAttributeValue("", 1296, Url.Action("Index", "Home"), 1296, 28, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <i class=\"ico-home\"></i>\r\n                </a>\r\n            </li>\r\n            <li>\r\n                ");
#nullable restore
#line 51 "D:\_project2\HrAdm\Views\Shared\_Top.cshtml"
           Write(_Fun.GetBaseUser().UserName);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n            </li>\r\n            <li>\r\n                <a class=\"nav-link\" title=\"Logout\"");
            BeginWriteAttribute("href", " href=\"", 1566, "\"", 1602, 1);
#nullable restore
#line 54 "D:\_project2\HrAdm\Views\Shared\_Top.cshtml"
WriteAttributeValue("", 1573, Url.Action("Logout", "Home"), 1573, 29, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <i class=\"ico-exit\"></i>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</nav>\r\n\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
