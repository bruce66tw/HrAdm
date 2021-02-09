
declare @flowId varchar(10)
set @flowId = '5YV7ZGE5ZA'

select * from Flow where Id=@flowId
select * from FlowNode where FlowId=@flowId
select * from FlowLine where FlowId=@flowId
