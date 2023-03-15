 SELECT *
 FROM cms_user
	LEFT JOIN cms_session
        ON cms_session.id_user = cms_user.id
    LEFT JOIN x_cms_user_xx_cms_permission
        ON x_cms_user_xx_cms_permission.id_user = cms_user.id
    LEFT JOIN x_cms_user_xx_cms_group
        ON x_cms_user_xx_cms_group.id_user = cms_user.id
    LEFT JOIN x_cms_group_xx_cms_permission
        ON x_cms_group_xx_cms_permission.id_group = x_cms_user_xx_cms_group.id_group
    LEFT JOIN cms_group
        ON cms_group.id = x_cms_user_xx_cms_group.id_group
    LEFT JOIN x_cms_permission
        ON x_cms_permission.id IN (
            x_cms_user_xx_cms_permission.id_permission,
            x_cms_group_xx_cms_permission.id_permission
        )
 WHERE cms_session.token = '';