import { Injectable } from '@angular/core';
import { APIService } from '../../../core/services/http/api.service';
import { UrlEndpoints } from '../../constants/url-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigurationService {

  constructor(private _api: APIService) { }

  geSystemConfiguration(){
    return  this._api.doGet(UrlEndpoints.GET_SystemConfiguration)
  }

updateSystemCoreConfiguration(configuration: any){
    return   this._api.doPost(UrlEndpoints.Update_SystemCoreConfiguration, configuration)
  }

   GetSystemConfigurationProfessionsList(){
    return  this._api.doGet(UrlEndpoints.Get_SystemConfigurationProfessionsList)
  }

   GetSystemConfigurationRejectionReasonList(){
    return  this._api.doGet(UrlEndpoints.Get_SystemConfigurationRejectionReasonList)
  }
 
    GetSystemConfigurationProfessionsById(id: number){
    return  this._api.doGet(UrlEndpoints.Get_SystemConfigurationProfessionsById+id)
  }

    GetSystemRiskRejectionReasonsById(id: number){
    return  this._api.doGet(UrlEndpoints.Get_SystemRejectionReasonById+id)
  }
 

  createSystemCongifurationProfession(configuration:any){
    return   this._api.doPost(UrlEndpoints.post_CreateSystemConfiguration, configuration)
  }

  createSystemRejectionReason(configuration:any){
    return   this._api.doPost(UrlEndpoints.post_CreateSystemRejectionReason, configuration)
  }

  deleteSystemConfigurationProfessionsById(profession:any){
    return   this._api.doGet(UrlEndpoints.Get_DeleteSystemConfigurationProfessionsById+'?Id='+profession.id+'&isDeleted='+profession.isDeleted)
  }

  deleteSystemRiskRejectionReasonById(reason:any){
    return   this._api.doGet(UrlEndpoints.Get_DeleteSystemRiskRejectionReasonById+'?Id='+reason.id+'&isDeleted='+reason.isDeleted)
  }

  activeSystemConfigurationProfessionsById(profession:any){
    return   this._api.doGet(UrlEndpoints.Get_ActiveSystemConfigurationProfessionsById+'?Id='+profession.id+'&isActive='+profession.isActive)
  }

  activeSystemRiskRejectionReasonById(reason:any){
    return   this._api.doGet(UrlEndpoints.Get_ActiveSystemConfigurationRiskRejectionReasonById+'?Id='+reason.id+'&isActive='+reason.isActive)
  }
  
  updateSystemCongifurationProfession(profession:any){
    return   this._api.doPost(UrlEndpoints.post_UpdateSystemConfigurationProfessions, profession)
  }

  UpdateSystemConfiguratioRejectionReason(reason:any){
    return   this._api.doPost(UrlEndpoints.post_UpdateSystemConfiguratioRejectionReason, reason)
  }

}
