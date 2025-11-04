import { Component, OnInit,  ChangeDetectorRef  } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-plantilla-reporte',
  templateUrl: './plantilla-reporte.component.html',
  styleUrls: ['./plantilla-reporte.component.scss']
})
export class PlantillaReporteComponent implements OnInit 
{

  dummies: any[];
  virtualDummies: any[];
  cols: any[];
  isLoading = false;
  totalRecords = 0;
  rowCount = 20;
  rowGroupMetadata: any;

  constructor(private _cdr: ChangeDetectorRef) 
  { 

  }

  ngOnInit(): void 
  {
    this.dummies = this.getData(50000);
    this.virtualDummies = this.dummies.slice(0, this.rowCount);
    this.totalRecords = this.dummies.length;
   // this.sortVirtualDummiesByField('ID');
    this.updateRowGroupMetaData();
    this.cols = [
    //  { field: 'ID', header: 'ID' },
      { field: 'cedula_beneficiario', header: 'Cédula' },
      { field: 'nombres', header: 'Beneficiario' },
      { field: 'Timestamp', header: 'Timestamp' },
      { field: 'TrackingId', header: 'TrackingId' },
      { field: 'UserId', header: 'UserId' },
    ];
  
  }

  log(value: any) {
    console.log(value);
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.virtualDummies) 
    {
        for (let i = 0; i < this.virtualDummies.length; i++) {
            let rowData = this.virtualDummies[i];
            let ID = rowData.id;
            console.log("registro",ID);
            if (i == 0) {
                this.rowGroupMetadata[ID] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.virtualDummies[i - 1];
                let previousRowGroup = previousRowData.ID;
                if (ID === previousRowGroup)
                    this.rowGroupMetadata[ID].size++;
                else
                    this.rowGroupMetadata[ID] = { index: i, size: 1 };
            }
        }
    }
    console.log(this.rowGroupMetadata);
}

  loadDataOnScroll(event: LazyLoadEvent) {
    this.isLoading = true;
    setTimeout(() => {
      const first = event.first;
      const last = first + event.rows;
      this.virtualDummies = [...this.dummies.slice( first, last )];
      this.isLoading = false;
      this._cdr.detectChanges();
    }, 100);
  }



  sortVirtualDummiesByField(field: string) {
    console.log(this.virtualDummies);
    this.virtualDummies = this.virtualDummies.sort((a, b) => {
      return a[field] < b[field] ? -1 : 1;
    });
    console.log(this.virtualDummies);
  }

  getData(count: number): any[] {
    let data = [];
    for(let i = 0; i < count; i++) {
      data.push({
        id: i%2===0?'Debug':'Error',
        cedula_beneficiario: i.toString(),
        nombres: 'ITSG.DIC.Frontend.Host_AppDomain(0d34ff1b-0c1e-4d45-a835-9e3082a47253)',
        AssemblyFilePath: 'D:\PROGRAMME\DIC\PRODUCT\DIC.HOSTINGSERVICE\COMPONENTS\ITSG.DIC.INFRASTRUCTURE.AUTHENTICATION.FRONTEND\IdentityServer3.dll',
        AssemblyFileVersion: '2.5.4.0',
        AssemblyName: 'IdentityServer3, Version=2.5.0.0, Culture=neutral, PublicKeyToken=null',
        AssemblyProductVersion: '2.5.4.0',
        ClassName: 'IdentityServer3.Core.Logging.LogProviders.SerilogLogProvider+SerilogLogger',
        CorrelationId: '029a0cda-5ae3-4f5c-8a7a-64e1cc2314b0',
        ExceptionType: 'ITSG.DIC.Facades.PullBase.Domain.Exceptions.PullCommunicationException',
        Host: 'Q11350SWWEBDI11',
        Message: `
        "Identity-System: [""\""Authorize request validation success\"""", ""\""{
\\""ClientId\\"": \\""B2CCC727-CAB6-443D-B10F-64D6DD81FC2B\\"",
\\""ClientName\\"": \\""DicFrontendClient\\"",
\\""RedirectUri\\"": \\""http://q11350swwebdi11.dic.nocdmz.loc:80/silentRenew.html?\\"",
\\""AllowedRedirectUris\\"": [
\\""http://q11350swwebdi11.dic.nocdmz.loc:80/#/authenticate?\\"",
\\""http://q11350swwebdi11.dic.nocdmz.loc:80/silentRenew.html?\\""
],
\\""SubjectId\\"": \\""68078ee6-9eef-4832-952f-3a9c117264ba\\"",
\\""ResponseType\\"": \\""id_token token\\"",
\\""ResponseMode\\"": \\""fragment\\"",
\\""Flow\\"": \\""Implicit\\"",
\\""RequestedScopes\\"": \\""FrontendApi openid profile\\"",
\\""State\\"": \\""aafd3755c2694741bd79ef53c47951ef\\"",
\\""Nonce\\"": \\""60f738fb392c43998f0a6d62ee3273e6\\"",
\\""PromptMode\\"": \\""none\\"",
\\""SessionId\\"": \\""41a39e9aa2ea149699dde6fb0a1f2f61\\"",
\\""Raw\\"": {
\\""client_id\\"": \\""B2CCC727-CAB6-443D-B10F-64D6DD81FC2B\\"",
\\""redirect_uri\\"": \\""http://q11350swwebdi11.dic.nocdmz.loc:80/silentRenew.html?\\"",
\\""response_type\\"": \\""id_token token\\"",
\\""scope\\"": \\""FrontendApi openid profile\\"",
\\""state\\"": \\""aafd3755c2694741bd79ef53c47951ef\\"",
\\""nonce\\"": \\""60f738fb392c43998f0a6d62ee3273e6\\"",
\\""prompt\\"": \\""none\\"",
\\""id_token_hint\\"": \\""eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJpc3MiOiJodHRwOi8vcTExMzUwc3d3ZWJkaTExLmRpYy5ub2NkbXoubG9jOjgwODIiLCJhdWQiOiJCMkNDQzcyNy1DQUI2LTQ0M0QtQjEwRi02NEQ2REQ4MUZDMkIiLCJleHAiOjE1NDAyMTY5MTIsIm5iZiI6MTU0MDIxNTU5Miwibm9uY2UiOiJkN2Q5ZDcxOGNjYTA0ZWMwYmRkYmJhNzM1ZDY4YjQzYSIsImlhdCI6MTU0MDIxNTU5MiwiYXRfaGFzaCI6IjVQejBOU2RpdkpqT3FYMk84N2wtSFEiLCJzaWQiOiI0MWEzOWU5YWEyZWExNDk2OTlkZGU2ZmIwYTFmMmY2MSIsInN1YiI6IjY4MDc4ZWU2LTllZWYtNDgzMi05NTJmLTNhOWMxMTcyNjRiYSIsImF1dGhfdGltZSI6MTU0MDIxNTU5MiwiaWRwIjoiaWRzcnYiLCJuYW1lIjoiRHIuIElnbmF0aXVzIENhcmxzb24iLCJpZCI6IjY4MDc4ZWU2LTllZWYtNDgzMi05NTJmLTNhOWMxMTcyNjRiYSIsInVzZXJuYW1lIjoiYWRtaW4iLCJsYXN0bG9naW4iOiIyMDE4LTEwLTIyVDEwOjMwOjU4LjIwNyIsImFtciI6WyJwYXNzd29yZCJdfQ.DIV-oqi3kIJu2UH833bW0bgtKgdmss-miMmuWVNLwt6NqBpjRIqOgvMVHttpby6p9GwukCEuYUD9CSVsNafQZREgqXxyqWEuve2m8b25CaFN1KCIQpovwP7X9b0yC3XO07H1URw0D0ajQ5DHtQq02hZhg9V4Mgh-h9duP740C_rdUTZrmuwFKEvyShHMTu8gEl3VFrruYOl5-PZFe2jEAYWHlkL-eU-2xJa-A41ThL2XXbgbbc4lwsryaxJ6VN-ZMd4jKCIzi-3-Nqxnu80T0BimMhmkWpqrtKe_ucOvXArkBKJHUInfqMStbUHPXDSJoqmqgQeEgQeBBCEAi1XQIg\\""
}
}\"""", ""\""IdentityServer3.Core.Validation.AuthorizeRequestValidator\""""]
{1}"` + i,
        MethodName: 'Log',
        Timestamp: '22.10.2018 15:40:27.123',
        TrackingId: '029a0cda-5ae3-4f5c-8a7a-64e1cc2314b0',
        UserId: '029a0cda-5ae3-4f5c-8a7a-64e1cc2314b0',
      })
    }
    return data;
}

}
